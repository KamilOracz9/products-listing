module.exports = {
  apps: [
    {
      name: 'NewTrendy',
      port: 3001,
      script: "npx serve .output/public",
      interpreter: "none",
    }
    // {
    //   name: 'NewTrendy',
    //   port: '3001',
    //   script: './.output/server/index.mjs',
    // }
  ]
}