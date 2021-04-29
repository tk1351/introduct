import express from 'express'

export default {
  testRouter: (_: express.Request, res: express.Response): void => {
    res.send('auth router')
  },
}
