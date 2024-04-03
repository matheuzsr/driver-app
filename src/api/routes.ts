import express, { type NextFunction, type Request, type Response } from 'express'
import Signup, { type Input } from '../Signup'
import AccountDAO from '../database/dao/AccountDAOPostgres'
import config from '../config/config'
// import { responseMiddleware } from '../middleware/responseMiddleware'
import { type BusinessError } from '../error/BusinessError'

export default function routes (): void {
  const app = express()
  app.use(express.json())

  const dao = new AccountDAO()
  const signup = new Signup(dao)

  app.get('/', function (_: Request, res: Response) {
    res.json({ up: 'Hello world! 🚀' })
  })

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.post('/signup', async function (req: Request, res: Response, next: NextFunction) {
    try {
      const output = await signup.execute(req.body as Input)
      res.json(output)
    } catch (error: any) {
      next(error)
    }
  })

  // app.use(responseMiddleware)
  app.use((error: BusinessError, req: Request, res: Response) => {
    console.log(error)
    console.log('error')

    return res.json('Caiu no middleware de error')
  })
  app.listen(config.PORT ?? 3000)
}
