import { Request, Response } from 'express'
import { LoginUserService } from '../services/LoginUserService'

export class LoginUserController {
  async handle (request: Request, response: Response) {
    const { email, password } = request.body

    const loginUsersService = new LoginUserService()

    const users = await loginUsersService.execute({
      email,
      password
    })

    console.log(users)
    if (users === false) {
      response.json({
        status: 422,
        mensagem: 'Falha no cadastro'
      })
    } else {
      response.json({
        status: 200
      })
    }
  }
}
