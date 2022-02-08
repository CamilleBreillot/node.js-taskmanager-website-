// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongo.ObjectID

const { MongoClient, ObjectID, ObjectId } = require('mongodb')

const connectionURL = process.env.MONGODB_URL
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id)

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!')
  }

  const db = client.db(databaseName)

 // READ


  // db.collection('users').findOne({ _id: new ObjectId('61fa9db011a843a73678e0ab')}, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch')
  //   }
  //   console.log(user)
  //   })

  // db.collection('users').find({ name: 'Camille'}).toArray((error, users) => {
  //   console.log(users)
  // })

  //DELETE

  db.collection('users').deleteMany({
    age: 30
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })




  // CREATE

  // db.collection('users').insertOne({
  //   name: 'Jen',
  //   age: 29
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert user')
  //   }

  //   console.log(result.insertedId)
  // })

  // db.collection('tasks').insertMany([
  //   {
  //     description: "Do the laundry",
  //     completed: true
  //   }, {
  //     description: "Cook dinner",
  //     completed: false
  //   }, {
  //     description: "Grocery shopping",
  //     completed: false
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert documents')
  //   }

  //   console.log(result.insertedIds)
  // })

})
