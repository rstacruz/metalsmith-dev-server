# metalsmith-dev-server

> Development server for Metalsmith websites

metalsmith-dev-server is a simple, yet powerful tool to allow you to develop sites using the [Metalsmith] static site tool. Featuring:

- Compatible with any Metalsmith project
- Scroll syncing, network throttling, and more (via [Browsersync])
- Live reload of CSS changes

[Browsersync]: https://browsersync.io/
[Metalsmith]: http://metalsmith.io/

## Usage

0. **Install** — add this into your Metalsmith project.

  ```sh
  npm install --save-dev github:rstacruz/metalsmith-dev-server
  ```

0. **Create metalsmith.js** — Your project should have a file that exports the Metalsmith project.

  ```js
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
  ```

0. **Add scripts** — Add this to *package.json*.

  ```js
  "scripts": {
    "dev": "metalsmith-dev-server metalsmith.js --watch web"
  }

  // This example runs the Metalsmith app in `metalsmith.js`,
  // and auto-rebuilds when files in `web/` is changed.
  ```

0. **Start the server** — Use your new script:

  ```sh
  npm run dev
  ```

  Or to specify another port:

  ```sh
  npm run dev -- --port 3820
  ```

## Also see

[metalsmith-start](https://www.npmjs.com/package/metalsmith-start) is a more complex solution with other features, such as production mode.

## Thanks

**metalsmith-dev-server** © 2017+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[![](https://img.shields.io/github/followers/rstacruz.svg?style=social&label=@rstacruz)](https://github.com/rstacruz) &nbsp;
[![](https://img.shields.io/twitter/follow/rstacruz.svg?style=social&label=@rstacruz)](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/metalsmith-dev-server/contributors
