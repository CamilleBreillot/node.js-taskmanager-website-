require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('61fd3afc5a7096e057f5d47b').then((task) => {
//   console.log(task)
//   return Task.countDocuments({ completed: false })
// }).then((result) => {
//   console.log(result)
// }).catch((e) => {
//   console.log(e)
// })

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed: false })
  return count
}

deleteTaskAndCount('61fd3f452fbb6a0ba237e5bf').then((result) => {
  console.log(result)
}).catch((e) => {
  console.log(e)
})
