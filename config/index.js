const environment = process.env.NODE_ENV || 'development'

const isObject = item =>
  item && typeof item === 'object' && !Array.isArray(item)

const assign = (target, ...sources) => {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, {[key]: {}})
        assign(target[key], source[key])
      } else {
        Object.assign(target, {[key]: source[key]})
      }
    }
  }

  return assign(target, ...sources)
}

const pretty = obj => JSON.stringify(obj, null, 2)

const config = require(`./${environment}`)
config.environment = environment

// override config with local
try {
  const overridesConfig = require(`../config/${environment}.local`)
  if (overridesConfig) assign(config, overridesConfig)
} catch (err) {
  // do nothing
}

module.exports = config

// if run directly, print config
if (require.main === module) {
  console.log(`environment: ${config.environment}`)
  console.log(pretty(config))
}
