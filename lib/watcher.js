const report = require('./logger').report
const debounce = require('debounce')

/*
 * Watcher
 */

function watch (source, build) {
  var chokidar = require('chokidar')

  var watcher = chokidar.watch(source, {
    ignored: [
      /(^|[\/\\])\../, /* dot files */
    ],
    ignoreInitial: true
  })

  watcher.on('all', debounce(() => {
    report(build())
    .catch(err => {})
  }, 250))
}

/*
 * Export
 */

module.exports = { watch }
