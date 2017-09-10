const join = require('path').resolve
const throat = require('throat')
const { server } = require('./server')
const { warn, log, report } = require('./logger')
const { watch } = require('./watcher')

/*
 * Run!
 */

function run (opts, argv) {
  // Require Metalsmith
  const appfile = join(process.cwd(), argv[0])
  const app = require(appfile)

  // Promise shim for Metalsmith building
  const build = throat(1, () => {
    return new Promise((resolve, reject) => {
      app.build(err => {
        if (err) return reject(err)
        resolve()
      })
    })
  })

  // Build first, then start server and other artifacts
  report(build())
  .then(() => {
    server(app.destination(), opts)
    if (opts.watch) {
      // Don't clean the dir when rebuilding
      app.clean(false)

      log('Watching files in', opts.watch)
      watch(opts.watch, build)
    } else {
      log('Auto-rebuilding disabled. Use --watch to enable')
    }
  })
  .catch(err => {
    warn(err)
    process.exit(1)
  })
}

/*
 * Export
 */

exports.run = run
