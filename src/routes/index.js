const express = require('express')

const contacts = require('./contacts')
const login = require('./login')
const mongo = require('../mongo')()

const rootRouter = express.Router()

rootRouter.get('/', async (req, res) => {
  try {
    const client = await mongo;
    const db = client.db('adressbook')
    const collection = db.collection('users')
    console.log(await collection.find().toArray())
    res.send('Home')
  } catch (err) {
    console.log(err)
    res.send('err')
  }
})

rootRouter.post('/', async (req, res) => {
  const client = await mongo;
  const db = client.db('adressbook')
  const collection = db.collection('users')
  await collection.remove({})
  res.send('removed')
})

module.exports = {
  rootRouter,
  contacts,
  login,
}