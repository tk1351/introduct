import request from 'supertest'
import app from '../../app'

describe('Test users routes', () => {
  it('Should response get mothod', (done) => {
    request(app)
      .get('/api/v1/users/test')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toEqual('users router')
        done()
      })
  })
})
