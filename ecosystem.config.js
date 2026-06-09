module.exports = {
  apps: [
    {
      name: 'restart-db',
      script: './docker-runner.js',
      cwd: '/home/absolute/Documents/absolute-api',
      cron_restart: '0 2 * * *',
      autorestart: false,
    },
  ],
};
