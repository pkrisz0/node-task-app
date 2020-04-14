const mongoose = require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

// User.findByIdAndUpdate('5e84ade644c0dc669c795f07', { age: 100 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 100})
// }).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

// updateAgeAndCount('5e84ade644c0dc669c795f07', 200).then((count) => {
//     console.log('count', count)
// }).catch((e) => {
//     console.log('error', e)
// })

// Task.findByIdAndRemove('5e85f79821b7b71fa4e35a42').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

removeAndCountIncomplete = async (id, completed) => {
    const deletedTask = await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({ completed })
    return count;
}

removeAndCountIncomplete('5e85f79c21b7b71fa4e35a43', false).then((count) => {
    console.log('count', count)
}).catch((e) => {
    console.log('error', e)
})