const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOne, userOneId, setUpDB } = require('./fixtures/db')


beforeEach(setUpDB)

test('Should sign up a new user', async () => {
  const response = await request(app).post('/users').send({
    name: 'camille',
    email: 'camille@gmail.com',
    password: 'hellocamille'
  }).expect(201)

  //assert that database was changed correctly
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  //assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: 'camille',
      email: 'camille@gmail.com',
    },
    token: user.tokens[0].token
  })
  expect(user.password).not.toBe('hellohello')
})


test('Should login existing user', async () => {
  const response = await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)

  //validate new token is saved
  const user = await User.findById(userOneId)
  expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexisting user', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: 'badpassword'
  }).expect(400)
})

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    //validate user has been deleted from DB
  expect(await  User.findById(userOneId)).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg') // provided by supertest
    .expect(200)

    //check is binary data for image is saved
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer)) // to equal because can't compare 2 objects with === (so no to be)
})

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Pierrelouis',
    })
    .expect(200)

  const user = await User.findById(userOneId)
  expect(user.name).toEqual('Pierrelouis') // to equal and not to be
})

test('Should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'paris',
    })
    .expect(400)
})
