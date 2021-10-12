import { Router } from 'express'
import { CreateUserController } from './controllers/CreateUserController'
import { LoginUserController } from './controllers/LoginUserController'

const router = Router()

const createUserController = new CreateUserController()
const loginUserController = new LoginUserController()

router.post('/users', createUserController.handle)
router.post('/login', loginUserController.handle)

export { router }
