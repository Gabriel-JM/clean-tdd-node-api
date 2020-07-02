const LoginRouterComposer = require('../composers/login-router-composer')
const { adapt } = require('../adapters/express-router-adapter')

module.exports = async router => {
  const loginRouter = LoginRouterComposer.compose()
  router.post('/login', adapt(loginRouter))
}
