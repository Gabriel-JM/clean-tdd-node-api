const MissingParamError = require('../../utils/errors/missing-param-error')

module.exports = class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    if (!this.userModel) {
      throw new MissingParamError('userModel')
    }

    const user = await this.userModel.findOne(
      { email },
      {
        projection: {
          password: 1
        }
      }
    )

    return user
  }
}
