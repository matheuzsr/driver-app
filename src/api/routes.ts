import express, { type Request, type Response } from 'express'
import Signup, { type Input } from '../Signup'
import AccountDAO from '../database/dao/AccountDAOPostgres'
import config from '../config/config'
import { responseMiddleware } from '../middleware/responseMiddleware'
import asyncHandler from 'express-async-handler'

export default function routes (): void {
  const app = express()
  app.use(express.json())

  const dao = new AccountDAO()
  const signup = new Signup(dao)

  app.get('/', function (_: Request, res: Response) {
    res.json({ up: 'Hello world! 🚀' })
  })

  app.post('/signup', asyncHandler(async (request: Request, response: Response) => {
    try {
      const output = await signup.execute(request.body as Input)
      response.json(output)
    } catch (error: unknown) {
      response.status(400).json({ message: '[BusinessError] Tratei fora!' })
    }
  }))

  app.use(responseMiddleware)
  app.listen(config.PORT ?? 3000)
}
