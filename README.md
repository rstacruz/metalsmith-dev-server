# metalsmith-dev-server

> Development server for Metalsmith

metalsmith-dev-server is a simple, yet powerful tool to allow you to develop Metalsmith sites. Featuring:

- Live reload of CSS changes
- Powered by [Browsersync] for scroll syncing, network throttling, etc

[Browsersync]: https://browsersync.io/

## Usage

This example runs the Metalsmith app in `metalsmith.js`, and auto-rebuilds when files in `web/` is changed.

```
metalsmith-dev-server metalsmith.js --watch web
```

## Also see

- [metalsmith-start](https://www.npmjs.com/package/metalsmith-start) is a more complex solution with other features.

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
