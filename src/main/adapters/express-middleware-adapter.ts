import { Request, Response, NextFunction } from 'express'
import { Middleware } from '../../presentation/protocols'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.authorization?.split('Bearer ')[1],
      ...(req.headers || {}),
    }
    const httpResponse = await middleware.handle(request)

    req.body = {
      ...req.body,
      ...httpResponse.body,
    }
    if (httpResponse.statusCode === 200) {
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      })
    }
  }
}
