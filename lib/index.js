const browserSync = require('browser-sync')
const resolve = require('path').resolve
const throat = require('throat')
const debounce = require('debounce')
const debug = (...args) => { console.log('[Metal]', ...args) }

/*
 * Run!
 */

function run (opts, argv) {
  // Require Metalsmith
  const appfile = resolve(process.cwd(), argv[0])
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

      debug('Watching files in', opts.watch)
      watch(opts.watch, build)
    } else {
      debug('Auto-rebuilding disabled. Use --watch to enable')
    }
  })
  .catch(err => {
    warn(err)
    process.exit(1)
  })
}

/*
 * Browser sync service
 */

function server (path, opts) {
  const bs = browserSync.create()
  const port = opts.port || process.env.PORT

  bs.watch(resolve(path, '**/*.css'), (event, file, details) => {
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
 * Warn
 */

function warn (err) {
  console.warn(err.message)
}

/*
 * Report progress
 */

function report (promise) {
  const now = +new Date()
  debug('Building...')

  return Promise.resolve(promise)
    .then(res => {
      debug(`Building... OK [${ms(+new Date() - now)}]`)
      return res
    })
    .catch(err => {
      debug(`Building... Error [${ms(+new Date() - now)}]`)
      warn(err)
      throw err
    })
}

function ms (val) {
  return `${val / 1000}s`
}

/*
 * Export
 */

exports.run = run
