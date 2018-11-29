const express = require('express')

const config = require('./config')
const routes = require('./src/routes')

const app = express()

app.use(express.json())
app.use('/', routes.rootRouter)
app.use('/login', routes.login)
app.use('/contacts', routes.contacts)

app.listen(config)