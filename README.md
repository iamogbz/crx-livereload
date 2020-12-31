# Chrome Extension Live Reload

[![Build Status](https://github.com/iamogbz/crx-livereload/workflows/Build/badge.svg)](https://github.com/iamogbz/crx-livereload/actions?query=workflow%3ABuild)
[![Coverage Status](https://coveralls.io/repos/github/iamogbz/crx-livereload/badge.svg)](https://coveralls.io/github/iamogbz/crx-livereload)
[![NPM Package](https://img.shields.io/npm/v/crx-livereload.svg)](https://www.npmjs.com/package/crx-livereload)
[![Dependencies](https://david-dm.org/iamogbz/crx-livereload/status.svg)](https://david-dm.org/iamogbz/crx-livereload)
[![Dependabot badge](https://badgen.net/dependabot/iamogbz/crx-livereload/?icon=dependabot)](https://app.dependabot.com)

No more manual reloading of unpacked chrome extensions when developing!

Shamelessly ripped from [xpl/crx-hotreload](https://github.com/xpl/crx-hotreload)

## Usage

In your `manifest.json`:

```json
"permissions": ["management", "activeTab"]
```

- `management` allows for reloading the chrome extension (**required**)
- `activeTab` allows for logging status to the current tab (*optional*)

In your `background` script:

```js
import "crx-livereload";
```

Build, watch and see the automagic happen.
