import request from 'supertest'
import app from '../../app'

describe('Test auth routes', () => {
  it('Should response get mothod', (done) => {
    request(app)
      .get('/api/v1/auth/test')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toEqual('auth router')
        done()
      })
  })
})
