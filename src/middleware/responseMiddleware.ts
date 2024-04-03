import { type Request, type Response, type NextFunction } from 'express'
import { BusinessError } from '../error/BusinessError'
import { InfraError } from '../error/InfraError'
import { PermissionError } from '../error/PermissionError'
import { ValidationError } from '../error/ValidationError'
import type express from 'express'
import type core from 'express-serve-static-core'

const asyncHandler = <P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = core.Query>(
  fn: (...args: Parameters<express.RequestHandler<P, ResBody, ReqBody, ReqQuery>>) => void | Promise<void>
): express.RequestHandler<P, ResBody, ReqBody, ReqQuery> =>
    async function asyncUtilWrap (...args: Parameters<express.RequestHandler<P, ResBody, ReqBody, ReqQuery>>) {
      const fnReturn = fn(...args)
      const next = args[args.length - 1] as NextFunction

      await Promise.resolve(fnReturn).catch(next)
    }

export default asyncHandler

export function responseMiddleware (error: Error, _: Request, response: Response, next: NextFunction): any {
  if (error instanceof BusinessError) {
    return response.status(400).json({ message: '[BusinessError] Houve um erro na regra de negócio!' })
  }

  if (error instanceof InfraError) {
    return response.status(500).json({ message: '[InfraError] Tivemos um problema com a infra estrutura!' })
  }

  if (error instanceof PermissionError) {
    return response.status(403).json({ message: '[PermissionError] Você não tem acesso a este recurso!' })
  }

  if (error instanceof ValidationError) {
    return response.status(422).json({ message: '[ValidationError] Você não tem acesso a este recurso!' })
  }

  next()
}
