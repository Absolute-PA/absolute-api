const { exec } = require('child_process');

// Function to run a shell command
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    const process = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`⚠️ Stderr: ${stderr}`);
      }
      console.log(`✅ Output: ${stdout}`);
      resolve(stdout);
    });
  });
};

// Run docker-compose up
const startDocker = async () => {
  console.log('🚀 Stoping Docker Compose...');
  console.log('Date: ', new Date().toLocaleString());
  await runCommand('docker compose down'); // Run in detached mode

  const WAIT_TIME = 10 * 1000; // 10 seconds
  console.log(`⏳ Waiting for ${WAIT_TIME / 1000} seconds...`);
  await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));

  console.log('🛑 Starting Docker Compose...');
  await runCommand('docker compose up -d');

  console.log('✅ Docker Compose Started.');
  console.log('Date: ', new Date().toLocaleString());
};

// Execute the function
startDocker().catch((err) => console.error('❌ Script failed:', err));
