/*
 * Example metalsmith.js:
 * This builds the site when ran via `node metalsmith.js`.
 * When used as `require('./metalsmith'), it returns the
 * app instance.
 */

const Metalsmith = require('metalsmith')

const app = Metalsmith(__dirname)
  .source('web')
  .destination('public')

if (module.parent) {
  module.exports = app
} else {
  app.build(err => { if (err) { console.error(err.message); process.exit(1) } })
}
