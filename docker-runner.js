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

    // Forward output to the console
    process.stdout.pipe(process.stdout);
    process.stderr.pipe(process.stderr);
  });
};

// Run docker-compose up
const startDocker = async () => {
  console.log('🚀 Stoping Docker Compose...');
  await runCommand('docker compose -f ./scripts/docker-compose.yml down'); // Run in detached mode

  const WAIT_TIME = 5 * 1000; // 60 seconds
  console.log(`⏳ Waiting for ${WAIT_TIME / 1000} seconds...`);
  await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));

  console.log('🛑 Starting Docker Compose...');
  await runCommand('docker compose -f ./scripts/docker-compose.yml up -d');
  console.log('✅ Docker Compose Started.');
};

// Execute the function
startDocker().catch((err) => console.error('❌ Script failed:', err));
