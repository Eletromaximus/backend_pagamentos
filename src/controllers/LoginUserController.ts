import { Request, Response } from 'express'
import { LoginUserService } from '../services/LoginUserService'
import jwt from 'jsonwebtoken'

export class LoginUserController {
  async handle (request: Request, response: Response) {
    const { email, password } = request.body

    const token = jwt.sign({ data: 'sessão ativa' }, 'conteúdo secreto', {
      expiresIn: '7d'
    })

    response.cookie('cookie', token, {
      path: '/',
      maxAge: 86400 * 7,
      sameSite: 'lax'
    })

    const loginUsersService = new LoginUserService()

    const users = await loginUsersService.execute({
      email,
      password
    })

    if (users === false) {
      return response.json({
        mensagem: 'Falha no cadastro'
      }).status(422).send()
    } else {
      return response.json({
        mensagem: 'tudo certo'
      }).status(200)
    }
  }
}
