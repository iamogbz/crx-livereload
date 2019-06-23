# Chrome Extension Live Reload

[![Greenkeeper badge](https://badges.greenkeeper.io/iamogbz/crx-livereload.svg)](https://greenkeeper.io/)
[![Dependencies](https://david-dm.org/iamogbz/crx-livereload.svg)](https://github.com/iamogbz/crx-livereload)
[![Build Status](https://travis-ci.org/iamogbz/crx-livereload.svg?branch=master)](https://travis-ci.org/iamogbz/crx-livereload)
[![Coverage Status](https://coveralls.io/repos/github/iamogbz/crx-livereload/badge.svg?branch=master)](https://coveralls.io/github/iamogbz/crx-livereload?branch=master)
[![NPM Package](https://img.shields.io/npm/v/crx-livereload.svg)](https://www.npmjs.com/package/crx-livereload)

No more manual reloading of unpacked chrome extensions when developing!

Shamelessly ripped from [xpl/crx-hotreload](https://github.com/xpl/crx-hotreload)

## Usage

In your `manifest.json`:

```json
"permissions": ["management"]
```

In your `background` script:

```js
import "crx-livereload";
```

Build, watch and see the automagic happen.
