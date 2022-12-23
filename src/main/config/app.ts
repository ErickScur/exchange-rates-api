import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import swaggerUI from 'swagger-ui-express'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
app.use(
  '/api-docs',
  swaggerUI.serve,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  swaggerUI.setup(require('./swagger.json')),
)
export default app
