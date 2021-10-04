import express from 'express'
import path from 'path'
import cors from 'cors'
import 'reflect-metadata'

// import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
//app.use(routes)
app.get('/', (request, response) => {
  return response.json({ message: 'Hello World'})
})

app.listen(3333)