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
    try {
      await runCommand('sudo reboot');
    } catch (rebootErr) {
      console.log('❌ Failed to reboot system:', rebootErr.message);
    }
  }
};

// Execute the function
startDocker().catch((err) => console.log('❌ Script failed:', err));
