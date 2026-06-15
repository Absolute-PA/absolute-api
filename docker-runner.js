const fs = require('fs');
const LOCK_FILE = '/var/tmp/absolute_db_reboot.lock';
const HUB_URL = 'https://hub.absolutepa.com.au';

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

function canReboot() {
  if (fs.existsSync(LOCK_FILE)) {
    const lockTime = new Date(fs.readFileSync(LOCK_FILE, 'utf8'));
    const now = new Date();
    const diffMs = now - lockTime;
    const diffHr = diffMs / (1000 * 60 * 60);
    if (diffHr > 1) {
      // Lock is older than 1 hour, remove it and allow reboot
      fs.unlinkSync(LOCK_FILE);
      console.log('🔓 Lock file expired (>1hr), allowing reboot.');
    } else {
      console.log('❌ Reboot already triggered recently. Skipping reboot.');
      return false;
    }
  }
  fs.writeFileSync(LOCK_FILE, new Date().toISOString());
  return true;
}
const { exec } = require('child_process');

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
      await runCommand('docker compose down');

      console.log(`⏳ Waiting for ${WAIT_TIME / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));

      console.log('⏳ Starting Docker Compose...');
      await runCommand('docker compose up -d');

      console.log('✅ Docker Compose Started.');
      console.log('Date: ', new Date().toLocaleString());
      success = true;
      await doCheckins().catch((err) => console.log('⚠️ Hub checkin error:', err.message));
    } catch (err) {
      console.log(`❌ Attempt ${attempts} failed. [${err.message}]`, err);
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
  const uiEnv = parseEnvFile('/home/absolute/Documents/absolute-ui/.env.device');
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

  for (const [component, version] of [['api', apiVersion], ['ui', uiVersion]]) {
    const body = JSON.stringify({ device_id: piName, channel, component, version });
    try {
      await runCommand(
        `curl -skf --max-time 5 -X POST -H "Content-Type: application/json" -d '${body}' "${HUB_URL}/api/checkin"`,
      );
      console.log(`Hub checkin OK: ${piName} ${component}@${version} (${channel})`);
    } catch (_) {
      console.log(`Hub checkin failed for ${component} (hub unreachable — continuing)`);
    }
  }
};

// Execute the function
startDocker().catch((err) => console.log('❌ Script failed:', err));
