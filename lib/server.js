const join = require('path').resolve
const warn = require('./logger').warn

/*
 * Browser-sync service
 *
 * @example
 *     server('/path/to/public', {
 *       port: 3000
 *     })
 */

function server (path, opts) {
  const bs = require('browser-sync').create()
  const port = opts.port || process.env.PORT

  // Auto-reload CSS
  bs.watch(join(path, '**/*.css'), (event, file, details) => {
    bs.reload('*.css')
  })

  bs.init({
    server: path,
    watchOptions: {
      awaitWriteFinish: true,
      ignoreInitial: true
    },
    port: port ? +port : undefined
  }, (err, res) => {
    if (err) {
      warn(err)
      process.exit(1)
    }
  })
}

exports.server = server
