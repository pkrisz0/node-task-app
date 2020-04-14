const express = require('express')

require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

// parses incoming json to an object
app.use(express.json())
// passing in the model routers
app.use(userRouter)
app.use(taskRouter)

module.exports = app