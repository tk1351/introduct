import express from 'express'

export default {
  testRouter: (req: express.Request, res: express.Response) => {
    res.send('profile router')
  },
}
