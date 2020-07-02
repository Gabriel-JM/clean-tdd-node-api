const MongoHelper = require('../helpers/mongo-helper')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')

let userModel

const makeSut = () => new LoadUserByEmailRepository()

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return null if no user is found', async () => {
    const sut = makeSut()
    const user = await sut.load('invalid_email@mail.com')

    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const sut = makeSut()

    const fromDBUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
    const user = await sut.load('valid_email@mail.com')

    expect(user).toEqual({
      _id: fromDBUser.ops[0]._id,
      password: fromDBUser.ops[0].password
    })
  })

  test('Should throw if no email is provided', async () => {
    const sut = makeSut()
    const promise = sut.load()

    await expect(promise)
      .rejects
      .toThrow('Missing param: email')
  })
})
