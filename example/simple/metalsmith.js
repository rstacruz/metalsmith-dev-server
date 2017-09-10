var Metalsmith = require('metalsmith')

var app = Metalsmith(__dirname)
  .source('web')
  .destination('public')

if (module.parent) {
  module.exports = app
} else {
  app.build((err) => {
    if (!err) return
    console.error(err.message)
    process.exit(1)
  })
}
