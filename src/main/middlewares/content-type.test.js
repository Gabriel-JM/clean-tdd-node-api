const request = require('supertest')
const app = require('../config/app')

const doNothing = (req, res) => res.send('')

describe('Content-Type Middleware', () => {
  test('Should return json content type as default', async () => {
    app.get('/test_content_type', doNothing)

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
})
