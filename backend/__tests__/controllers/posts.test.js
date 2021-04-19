const { mockReq, mockRes } = require('sinon-express-mock')
const postsController = require('../../controllers/posts')

describe('mock test', () => {
  it('testRouter', () => {
    const req = mockReq()
    const res = mockRes()

    postsController.testRouter(req, res)
    expect(res.status.calledWith(200)).toBeTruthy()
    // res.sendでDummyrouteが返ってくるのを確認
  })
})
