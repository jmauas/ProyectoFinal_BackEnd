module.exports = {
  apps : [{
    name: 'srv_Fork_1',
    script: './src/inicioSrv.js',
    watch: true,
    args: '8081',
    autorestart: true
  },
  {
    name: 'srv_Fork_2',
    script: './src/inicioSrv.js',
    watch: true,
    args: '8082',
    autorestart: true
  },
  {
    name: 'srv_Fork_3',
    script: './src/inicioSrv.js',
    watch: true,
    args: '8083',
    autorestart: true
  }]
};