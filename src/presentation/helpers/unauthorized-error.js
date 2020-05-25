module.exports = class UnauthorizedError extends Error {
  constructor () {
    super('Unathorized')
    this.name = 'UnathorizedError'
  }
}
