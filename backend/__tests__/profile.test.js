const request = require('supertest')
const app = require('../app')

describe('Test auth routes', () => {
  it('Should response get method', (done) => {
    request(app)
      .get('/api/v1/profile')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toEqual('Profile route')
        done()
      })
  })
})
