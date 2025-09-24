const { exec } = require('child_process');

const MAX_ATTEMPTS = 5;

// Function to run a shell command
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`⚠️ Stderr: ${stderr}`);
      }
      console.log(`✅ Command: ${command}. Output: ${stdout}`);
      resolve(stdout);
    });
  });
};

// Run docker-compose up/down with retry logic
const startDocker = async () => {
  let attempts = 0;
  let success = false;

  while (attempts < MAX_ATTEMPTS && !success) {
    try {
      console.log(`---- ATTEMPT ${attempts + 1} ------------`);
      console.log('🚀 Stopping Docker Compose...');
      console.log('Date: ', new Date().toLocaleString());
      await runCommand('docker compose down');

      const WAIT_TIME = 10 * 1000; // 10 seconds
      console.log(`⏳ Waiting for ${WAIT_TIME / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));

      console.log('🛑 Starting Docker Compose...');
      await runCommand('docker compose up -d');

      console.log('✅ Docker Compose Started.');
      console.log('Date: ', new Date().toLocaleString());
      success = true;
    } catch (err) {
      attempts++;
      console.error(`❌ Attempt ${attempts} failed:`, err.message);
      if (attempts < MAX_ATTEMPTS) {
        console.log('🔁 Retrying...');
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }

  if (!success) {
    console.error(
      `❌ Failed to restart Docker Compose after ${MAX_ATTEMPTS} attempts.`,
    );
    await runCommand('sudo reboot');
  }
};

// Execute the function
startDocker().catch((err) => console.error('❌ Script failed:', err));
