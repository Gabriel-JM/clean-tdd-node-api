const MongoHelper = require('./mongo-helper')

describe('Mongo Helper', () => {
  test('Should reconnect when getDb is invoked and client is disconnected', async () => {
    const sut = MongoHelper

    await sut.connect(process.env.MONGO_URL)
    expect(sut.db).not.toBeNull()

    await sut.disconnect()
    expect(sut.db).toBeNull()

    await sut.getDb()
    expect(sut.db).not.toBeNull()
  })

  afterAll(() => MongoHelper.disconnect())
})
