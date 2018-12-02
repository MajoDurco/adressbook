const express = require('express')

const contacts = require('./contacts')
const login = require('./login')
const { getAdressBookDB } = require('../utils/getDatabase')

const rootRouter = express.Router()

// eslint-disable-next-line
rootRouter.get('/', async (_, res) => {
  try {
    const db = await getAdressBookDB()
    const collection = db.collection('users')
    console.log(await collection.find().toArray())
    res.send('Home')
  } catch (err) {
    console.log(err)
    res.send('err')
  }
})

// eslint-disable-next-line
rootRouter.post('/', async (_, res) => {
  const db = await getAdressBookDB()
  const collection = db.collection('users')
  await collection.remove({})
  res.send('removed')
})

module.exports = {
  rootRouter,
  contacts,
  login,
}