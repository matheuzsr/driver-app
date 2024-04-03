import express, { type Request, type Response } from 'express'
import Signup from '../Signup'
import AccountDAO from '../database/dao/AccountDAOPostgres'
import config from '../config/config'

export default function routes (): void {
  const app = express()
  app.use(express.json())

  const dao = new AccountDAO()
  const signup = new Signup(dao)

  app.get('/', function (_: Request, res: Response) {
    res.json({ up: 'Hello world! 🚀' })
  })

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.post('/signup', async function (req: Request, res: Response) {
    try {
      const output = await signup.execute(req.body)
      res.json(output)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })

  app.listen(config.PORT || 3000)
}
