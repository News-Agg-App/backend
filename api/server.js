const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require('../auth/authRouter')


const server = express()

server.use(express.json())

server.use('/api/auth', authRouter)

server.get('/', (req, res) =>
{
    res.send("Server is running")
})

module.exports = server