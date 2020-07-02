module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:xxx/clean-node-api',
  tokenSecret: process.env.SECRET || 'secret'
}
