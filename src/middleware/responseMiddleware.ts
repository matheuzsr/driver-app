import { type Request, type Response, type NextFunction } from 'express'

export function responseMiddleware (error: Error, req: Request, res: Response, next: NextFunction): any {
  console.log(error)
  // next()
  return res.json({ caiu_no_error: true })
}
