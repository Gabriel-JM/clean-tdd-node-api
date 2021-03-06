const request = require('supertest')
const app = require('../config/app')

const doNothing = (req, res) => res.send('')

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/test_cors', doNothing)
    const res = await request(app).get('/test_cors')

    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})
