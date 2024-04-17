module.exports = {
  apps: [
    {
      name: 'nest-ka',
      script: './dist/main.js',
      instances: 2,
      exec_mode: 'cluster',
      max_memory_restart: '2G',
    },
  ],
};
