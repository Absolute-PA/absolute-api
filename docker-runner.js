const fs = require('fs');
const os = require('os');
const path = require('path');
const { exec } = require('child_process');

const HUB_URL = 'https://hub.absolutepa.com.au';

const COMPOSE = 'docker compose';

// Persistent state dir — /var/tmp is cleared on reboot, which let the old lock
// reset every boot and allowed an endless reboot loop.
const STATE_DIR = path.join(os.homedir(), '.absolutepa');
const LOCK_FILE = path.join(STATE_DIR, 'db_reboot.lock');
const REBOOT_LOG = path.join(STATE_DIR, 'reboot-count.json');
const MAX_REBOOTS_PER_DAY = 3;

function ensureStateDir() {
  try {
    fs.mkdirSync(STATE_DIR, { recursive: true });
  } catch (_) {}
}

// Errors that a retry/reboot will NOT fix — these are misconfiguration, not
// transient faults. Rebooting on these caused hundreds of reboots in the logs.
function isUnrecoverable(message) {
  return /permission denied|docker\.sock|Cannot connect to the Docker daemon/i.test(
    message || '',
  );
}

function parseEnvFile(filePath) {
  const result = {};
  try {
    const lines = fs.readFileSync(filePath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx === -1) continue;
      result[trimmed.slice(0, idx)] = trimmed.slice(idx + 1);
    }
  } catch (_) {}
  return result;
}

// Cap reboots per calendar day so a persistent fault can never reboot-storm.
function rebootBudgetExhausted() {
  const today = new Date().toISOString().slice(0, 10);
  let data = { date: today, count: 0 };
  try {
    const parsed = JSON.parse(fs.readFileSync(REBOOT_LOG, 'utf8'));
    if (parsed && parsed.date === today) data = parsed;
  } catch (_) {}
  if (data.count >= MAX_REBOOTS_PER_DAY) return true;
  data.count += 1;
  try {
    fs.writeFileSync(REBOOT_LOG, JSON.stringify(data));
  } catch (_) {}
  return false;
}

function canReboot() {
  ensureStateDir();
  if (fs.existsSync(LOCK_FILE)) {
    const lockTime = new Date(fs.readFileSync(LOCK_FILE, 'utf8'));
    const diffHr = (Date.now() - lockTime.getTime()) / (1000 * 60 * 60);
    if (diffHr > 1) {
      // Lock is older than 1 hour, remove it and allow reboot
      fs.unlinkSync(LOCK_FILE);
      console.log('🔓 Lock file expired (>1hr), allowing reboot.');
    } else {
      console.log('❌ Reboot already triggered recently. Skipping reboot.');
      return false;
    }
  }
  if (rebootBudgetExhausted()) {
    console.log(
      `❌ Reboot budget exhausted (max ${MAX_REBOOTS_PER_DAY}/day). Skipping reboot.`,
    );
    return false;
  }
  fs.writeFileSync(LOCK_FILE, new Date().toISOString());
  return true;
}

// Function to run a shell command
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, { timeout: 60000 }, (error, stdout, stderr) => {
      console.log(`Running command: ${command}`);

      if (error) {
        console.log(`❌ Error: [${error.message}]. Stderr: [${stderr}]`);
        return reject(error);
      }
      if (stderr) {
        console.log(`⚠️ Stderr: [${stderr}]`);
      }
      console.log(`✅ Output: [${stdout}]`);
      resolve(stdout);
    });
  });
};

// Run docker-compose up/down with retry logic
const startDocker = async () => {
  let attempts = 0;
  let success = false;
  const MAX_ATTEMPTS = 5;
  const WAIT_TIME = 10 * 1000; // 10 seconds

  while (attempts < MAX_ATTEMPTS && !success) {
    attempts++;
    try {
      console.log(`---- ATTEMPT ${attempts} ------------`);
      console.log('🚀 Stopping Docker Compose...');
      console.log('Date: ', new Date().toLocaleString());
      await runCommand(`${COMPOSE} down`);

      console.log(`⏳ Waiting for ${WAIT_TIME / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));

      console.log('⏳ Starting Docker Compose...');
      await runCommand(`${COMPOSE} up -d`);

      console.log('✅ Docker Compose Started.');
      console.log('Date: ', new Date().toLocaleString());
      success = true;
      await doCheckins().catch((err) =>
        console.log('⚠️ Hub checkin error:', err.message),
      );
    } catch (err) {
      console.log(`❌ Attempt ${attempts} failed. [${err.message}]`);

      // A permission/socket/context error is a configuration problem — retrying
      // and especially rebooting will NOT fix it. Bail out instead of looping.
      if (isUnrecoverable(err.message)) {
        console.log(
          '⛔ Unrecoverable Docker error (permission / socket / context).',
        );
        console.log(
          '   This is a configuration problem, not a transient fault —',
        );
        console.log(
          '   NOT retrying and NOT rebooting. Investigate the engine:',
        );
        console.log('     docker info');
        return;
      }

      if (attempts < MAX_ATTEMPTS) {
        console.log('🔁 Retrying...');
        await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
      }
    }
  }

  if (!success) {
    console.log(
      `❌ Failed to restart Docker Compose after ${MAX_ATTEMPTS} attempts.`,
    );
    if (canReboot()) {
      try {
        await runCommand('sudo reboot');
      } catch (rebootErr) {
        console.log('❌ Failed to reboot system:', rebootErr.message);
      }
    }
  }
};

const doCheckins = async () => {
  const apiEnv = parseEnvFile('.env.device');
  const uiEnv = parseEnvFile(
    '/home/absolute/Documents/absolute-ui/.env.device',
  );
  const piName = apiEnv['PI_NAME'] || '';
  const channel = apiEnv['CHANNEL'] || 'stable';

  if (!piName) {
    console.log('Hub checkin skipped — PI_NAME not set in .env.device');
    return;
  }

  let apiVersion = apiEnv['TARGET_VERSION_API'] || '';
  let uiVersion = uiEnv['TARGET_VERSION_UI'] || '';

  if (!apiVersion || !uiVersion) {
    try {
      const manifestJson = await runCommand(
        `curl -skf --max-time 5 "${HUB_URL}/api/manifest?channel=${channel}"`,
      );
      const manifest = JSON.parse(manifestJson.trim());
      if (!apiVersion) apiVersion = manifest.api || 'main';
      if (!uiVersion) uiVersion = manifest.ui || 'main';
    } catch (_) {
      if (!apiVersion) apiVersion = 'main';
      if (!uiVersion) uiVersion = 'main';
    }
  }

  for (const [component, version] of [
    ['api', apiVersion],
    ['ui', uiVersion],
  ]) {
    const body = JSON.stringify({
      device_id: piName,
      channel,
      component,
      version,
    });
    try {
      await runCommand(
        `curl -skf --max-time 5 -X POST -H "Content-Type: application/json" -d '${body}' "${HUB_URL}/api/checkin"`,
      );
      console.log(
        `Hub checkin OK: ${piName} ${component}@${version} (${channel})`,
      );
    } catch (_) {
      console.log(
        `Hub checkin failed for ${component} (hub unreachable — continuing)`,
      );
    }
  }
};

// Execute the function
startDocker().catch((err) => console.log('❌ Script failed:', err));
