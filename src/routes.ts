import { Router } from 'express'
import { CreateUserController } from './Controllers/CreateUserController'

const routes = Router()

const createUserController = new CreateUserController()

routes.post('/users', createUserController.handle)

export default routes
