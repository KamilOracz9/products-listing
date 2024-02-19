module.exports = {
  apps: [
    {
      name: 'NewTrendy',
      port: '3001',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}