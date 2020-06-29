const MongoHelper = require('../helpers/mongo-helper')
const UpdateAccessTokenRepository = require('./update-access-token-repository')

let db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)

  return {
    sut,
    userModel
  }
}

describe('UpdateAccessToken Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.getDb()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should update the user with the given accessToken', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
    await sut.update(fakeUser.ops[0]._id, 'valid_token')
    const updatedFakeUser = await userModel.findOne({ _id: fakeUser.ops[0]._id })
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })

  test('Should throw if no userModel is provided', async () => {
    const { userModel } = makeSut()
    const sut = new UpdateAccessTokenRepository()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })

    const promise = sut.update(fakeUser.ops[0]._id, 'any_email@mail.com')
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if no params are provided', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })

    await expect(sut.update()).rejects.toThrow('Missing param: userId')
    await expect(sut.update(fakeUser.ops[0]._id))
      .rejects
      .toThrow('Missing param: accessToken')
  })
})
