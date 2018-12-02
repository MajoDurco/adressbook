const config = {
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',
  jwtSecret: process.env.JWT_SECRET || 'wzBPT8J9hCTshGgvLkeKWd9c',
  port: process.env.PORT || 8080,
  firebase: {
    apiKey: process.env.FIREBASE_APIKEY,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
  },
  mongo: {
    atlasUrl: process.env.MONGO_ATLAS_URL
  }
}

module.exports = config
