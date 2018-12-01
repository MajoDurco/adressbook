
const env = process.env.ENV || 'local';

const config = {
  isLocalEnv() { return env === 'local'},
  isProductionEnv() { return env === 'production' },
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',
  jwtSecret: process.env.JWT_SECRET || 'wzBPT8J9hCTshGgvLkeKWd9c',
  port: process.env.PORT || 8080,
}

module.exports = config