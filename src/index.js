const express = require('express')

require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

// middleware
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Service temporarily unavailable..')
// })

// parses incoming json to an object
app.use(express.json())

// passing in the model routers
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('5e8b3b2f405f383874c5d62e')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5e8b3a79978bf73718ed18f9')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()