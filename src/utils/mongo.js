const mongo = require('mongodb')
const config = require('../../config')

module.exports = {
  mongo: mongo.connect(config.mongo.atlasUrl)
}
