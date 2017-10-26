/*
 * Log service
 */

function logger (context) {
  context.emitter.on('watch:start', ({ paths }) => {
    log('Watching for updates in:', paths)
  })

  context.emitter.on('watch:disabled', () => {
    log('Auto-updates is disabled. (enable it with --watch)')
  })

  context.emitter.on('build:start', () => {
    log('Building...')
  })

  context.emitter.on('build:finish', ({ elapsed }) => {
    log(`Building... OK [${elapsed / 1000}s]`)
  })

  context.emitter.on('build:error', ({ elapsed, error }) => {
    log(`Building... ERROR [${elapsed / 1000}s]`)
  })

  context.emitter.on('error', ({ error }) => {
    console.warn(error.message)
  })
}

function log (...args) {
  console.log('[Metalsmith]', ...args)
}

module.exports = logger
