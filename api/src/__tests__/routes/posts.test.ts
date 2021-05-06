import request from 'supertest'
import app from '../../app'

describe('Test post routes', () => {
  it('Should response get mothod', (done) => {
    request(app)
      .get('/api/v1/posts/test')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toEqual('posts router')
        done()
      })
  })
})
