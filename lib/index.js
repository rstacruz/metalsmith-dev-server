const join = require('path').resolve
const throat = require('throat')
const { server } = require('./server')
const { warn, log, report } = require('./logger')
const logger = require('./logger2')
const { watch } = require('./watcher')
const EventEmitter = require('events')

/*
 * The context
 */

class Context {
  constructor (opts, argv) {
    this.build = throat(1, this.build.bind(this))
    this.appfile = join(process.cwd(), argv[0])
    this.app = require(this.appfile)
    this.emitter = new EventEmitter() // Events for logging
    this.opts = opts
    this.argv = argv
  }

  /*
   * Promise shim for Metalsmith reloading
   */

  build () {
    return new Promise((resolve, reject) => {
      var now = +new Date()
      this.emitter.emit('build:start')

      this.app.build(error => {
        var elapsed = +new Date() - now
        if (error) {
          this.emitter.emit('build:error', { elapsed, error })
          reject(error)
        } else {
          this.emitter.emit('build:finish', { elapsed })
          resolve()
        }
      })
    })
  }

  run () {
    const { app, opts, argv, build, emitter } = this

    // Enable logging
    logger(this)

    // Build first, then start server and other artifacts
    build()
    .then(() => {
      server(app.destination(), opts)
      if (opts.watch) {
        // Don't clean the dir when rebuilding
        app.clean(false)
        emitter.emit('watch:start', { paths: opts.watch })
        watch(opts.watch, build)
      } else {
        emitter.emit('watch:disabled')
      }
    })
    .catch(error => {
      emitter.emit('error', { error })
      process.exit(1)
    })
  }
}

/*
 * Single function export
 */

function run (opts, argv) {
  return new Context(opts, argv).run()
}

/*
 * Export
 */

exports.run = run
