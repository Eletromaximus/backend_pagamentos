import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { router } from './routes'
import { CustomErrors } from './utils/CustomErrors'

import './database'

const app = express()
app.use(cors())

app.use(express.json())

app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next:NextFunction) => {
    if (err instanceof CustomErrors) {
      return response.status(err.status).json({
        error: err.message
      })
    }

    return response.status(500).json({
      status: err.name,
      message: err.message
    })
  })

app.listen(3333, () => console.log('server is running'))
