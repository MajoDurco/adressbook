const mongo = require('mongodb')

const uri = "mongodb://user:12345user12345@adressbookcluster-shard-00-00-piimf.mongodb.net:27017,adressbookcluster-shard-00-01-piimf.mongodb.net:27017,adressbookcluster-shard-00-02-piimf.mongodb.net:27017/test?ssl=true&replicaSet=AdressBookCluster-shard-0&authSource=admin&retryWrites=true"

module.exports = () => {
  return mongo.connect(uri);
}
