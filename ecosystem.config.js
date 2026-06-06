module.exports = {
  apps: [
    {
      name: 'restart-db',
      script: './docker-runner.js',
      cwd: __dirname,
      cron_restart: '0 2 * * *', // Run at 2 am
      autorestart: false, // No need to keep it running
    },
  ],
};
