const join = require('path').resolve
const warn = require('./logger').warn
const relative = require('path').relative

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

  if (opts.fullReload) {
    // Auto-reload everything
    bs.watch(join(path, '**/*'), (event, file) => {
      bs.reload()
    })
  } else {
    // Auto-reload CSS
    bs.watch(join(path, '**/*.css'), (event, file) => {
      const base = relative(path, file)
      bs.reload(base)
    })
  }

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
