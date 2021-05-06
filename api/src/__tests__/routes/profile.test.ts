import request from 'supertest'
import app from '../../app'

describe('Test profile routes', () => {
  it('Should response get mothod', (done) => {
    request(app)
      .get('/api/v1/profile/test')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toEqual('profile router')
        done()
      })
  })
})
