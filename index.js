const express = require('express')
const helmet = require('helmet')

const config = require('./config')
const routes = require('./src/routes')

const app = express()

app.use(helmet())
app.use(express.json())
app.use('/', routes.rootRouter)
app.use('/login', routes.login)
app.use('/contacts', routes.contacts)

app.listen(config)