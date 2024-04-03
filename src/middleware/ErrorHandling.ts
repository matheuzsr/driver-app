import { type NextFunction, type Request, type Response } from 'express'

// ErrorHandler.js
const ErrorHandler = (err: Error, _req: Request, res: Response, next: NextFunction): void => {
  console.log('Middleware Error Hadnling')
  const errStatus = err?.statusCode || 500
  const errMsg = err.message || 'Something went wrong'
  res.status(errStatus as number).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  })
}

export default ErrorHandler
