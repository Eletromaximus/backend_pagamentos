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

    if (users === false) {
      return response.json({
        mensagem: 'Falha no cadastro'
      }).status(422)
    } else {
      return response.json({
        mensagem: 'tudo certo'
      }).status(200)
    }
  }
}
