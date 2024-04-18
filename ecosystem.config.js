const PR = 'nest-ka';
module.exports = {
  apps: [
    {
      name: PR,
      script: './dist/main.js',
      instances: 2,
      exec_mode: 'cluster',
      max_memory_restart: '2G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss:SS',
      error_file: `/www/web/${PR}/error.log`,
      out_file: `/www/web/${PR}/out.log`,
    },
  ],
};
