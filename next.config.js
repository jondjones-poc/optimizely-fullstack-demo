const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['localhost', 'optimizely-demo.netlify.app'],
  },
  experimental: {
    appDir: true,
  }
}