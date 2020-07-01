const sut = require('./mongo-helper')

describe('Mongo Helper', () => {
  beforeAll(
    async () => await sut.connect(process.env.MONGO_URL)
  )

  afterAll(
    async () => await sut.disconnect()
  )

  test('Should reconnect when getDb is invoked and client is disconnected', async () => {
    expect(sut.db).not.toBeNull()

    await sut.disconnect()
    expect(sut.db).toBeNull()

    await sut.getDb()
    expect(sut.db).not.toBeNull()
  })
})
