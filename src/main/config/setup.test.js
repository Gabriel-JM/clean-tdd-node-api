const request = require('supertest')
const app = require('./app')

const doNothing = (req, res) => res.send('')

describe('App Setup', () => {
  test('Should disable x-powered-by header', async () => {
    app.get('/test_x_powered_by', doNothing)
    const res = await request(app).get('/test_x_powered_by')

    expect(res.headers['x-powered-by']).toBeUndefined()
  })
})
