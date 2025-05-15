import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import routeNotFound from './middlewares/routeNotFound'
import globalErrorHandler from './middlewares/globalErrorHandler'

const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to our database!',
  })
})

// route not found
app.use(routeNotFound)

// global error handler
app.use(globalErrorHandler)
export default app
