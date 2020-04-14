const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, setupData, userOne } = require('./fixtures/db')


beforeEach(setupData)

test('should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Zeldus',
        email: 'zeldus@example.com',
        password: 'MyPassNotFail77!'
    }).expect(201)
    
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
       user: {
        name: 'Zeldus',
        email: 'zeldus@example.com',
       },
       token: user.tokens[0].token
    })

    expect(user.password).not.toBe('MyPassNotFail77!')
})

test('should log in existing user', async () => {
    const response = await request(app)
    .post('/users/login')
    .send(userOne)
    .expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not log in non-existing', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'random password'
    }).expect(400)
})

test('should get profile for user', async () => {
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('should not get profile for not authenticated user', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('should delete profile for user', async () => {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('should not delete profile for not authenticated user', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('should update valid user fields', async () => {
   const response =  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'Bubics'
    })
    .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Bubics')
})

test('should not update invalid user fields', async () => {
    await request(app)
     .patch('/users/me')
     .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
     .send({
         location: 'Philly'
     })
     .expect(400)
 })