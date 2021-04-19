const { mockReq, mockRes } = require('sinon-express-mock')
const profileController = require('../../controllers/profile')

describe('mock test', () => {
  it('testRouter', () => {
    const req = mockReq()
    const res = mockRes()

    profileController.testRouter(req, res)
    expect(res.status.calledWith(200)).toBeTruthy()
    // res.sendでDummyrouteが返ってくるのを確認
  })
})
