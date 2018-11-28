
const env = process.env.ENV || 'local';

const config = {
  isLocalEnv() { return env === 'local'},
  isProductionEnv() { return env === 'production' },
  port: process.env.PORT || 8080,
}

module.exports = config