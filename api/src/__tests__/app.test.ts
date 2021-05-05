import request from 'supertest'
import app from '../app'

describe('Test root path', () => {
  it('Should response get method', (done) => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toEqual('Hello world')
        done()
      })
  })
})
