
class TokenGenerator {
  async generate (id) {
    return null
  }
}

const makeSut = () => new TokenGenerator()

describe('Token Generator', () => {
  test('Should return null if JWT returns null', async () => {
    const sut = makeSut()
    const token = await sut.generate('any_id')

    expect(token).toBeNull()
  })
})
