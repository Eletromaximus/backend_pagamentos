import { Request, Response } from 'express'
import { CreateUserService } from '../services/CreateUserService'

export class CreateUserController {
  async handle (request: Request, response: Response) {
    const { name, email, admin, password } = request.body

    const createUserService = new CreateUserService()

    const user = await createUserService.execute({
      name, email, admin, password
    })
      .then(() => {
        response.status(200)
      })
      .catch(() => {
        response.status(422)
      })

    return response.json(user)
  }
}
