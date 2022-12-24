import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import swaggerUI from 'swagger-ui-express'
import swagger from './swagger.json'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger))
export default app
