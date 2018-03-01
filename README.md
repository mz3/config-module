# config-module

A simple configuration module/pattern for node.js applications. This repository is meant to be a template, so don't try to `npm install` anything here.

```
/config/index.js
/config/{environment}.js
/config/{environment}.local.js (optional)
```

## Usage:

Copy the `config` folder into your project and set your configuration values in the appropriate files. For secrets or other machine-specific values, create an `{environment}.local.js` and put those values in there. They will get copied into the main configuration. Make sure to add `config/*.local.js` to your `.gitignore` as well.

```js
const config = require('./config')

// environment is automatically set to NODE_ENV or 'development'
console.log(config.environment)

// defaults should be set in `/config/{environment}.js`
console.log(config.port) // => 3000

// secrets should be set in `/config/{environment}.local.js`
console.log(config.secret)
```

Create your own environments simply by adding a new file (i.e. `staging.js`). Then overload the config by adding a local configuration file (`staging.local.js`) if needed.

## Command-line:

You can print the current loaded configuration for a given environment by executing the config module directly.

```
$ NODE_ENV=development node config/index.js

environment: development
{
  "port": 3000,
  "environment": "development"
}
```
