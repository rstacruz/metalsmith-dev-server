/*
 * Warn
 */

function warn (err) {
  console.warn(err.message)
}

function log (...args) {
  console.log('[Metalsmith]', ...args)
}

/*
 * Report progress
 */

function report (promise) {
  const now = +new Date()
  log('Building...')

  return Promise.resolve(promise)
    .then(res => {
      log(`Building... OK [${ms(+new Date() - now)}]`)
      return res
    })
    .catch(err => {
      log(`Building... Error [${ms(+new Date() - now)}]`)
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

module.exports = { warn, report, log }
