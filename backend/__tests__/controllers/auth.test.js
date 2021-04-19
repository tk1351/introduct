const { mockReq, mockRes } = require('sinon-express-mock')
const authController = require('../../controllers/auth')

describe('mock test', () => {
  it('testRouter', () => {
    const req = mockReq()
    const res = mockRes()

    authController.testRouter(req, res)
    expect(res.status.calledWith(200)).toBeTruthy()
    // res.sendでDummyrouteが返ってくるのを確認
  })
})
