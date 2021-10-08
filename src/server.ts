import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { router } from './routes'
import errorHandler from './utils/ValidationErrors'
import 'express-async-errors'

import './database'

const app = express()
app.use(cors())

app.use(express.json())

app.use(router)

app.use(errorHandler)

app.listen(3333, () => console.log('server is running'))
