const path = require('path')
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true,
  reactStrictMode: true,
  distDir: 'build',
})

module.exports = {
  sassOptions: {
   includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['localhost', 'optimizely-demo.netlify.app'],
    path: 'https://optimizely-demo.netlify.app/',
  },
}