import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'
import { hash } from 'bcryptjs'

interface IUserRequest {
  name: string,
  email: string,
  password: string,
  admin?: boolean
}

class CreateUserService {
  async execute ({ name, email, admin = false, password }: IUserRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories)

    if (!email) {
      throw new Error('Email não válido')
    }

    const userAlreadyExist = await usersRepositories.findOne({
      email
    })

    if (userAlreadyExist) {
      throw new Error('Usuário já está registrado')
    }

    if (password === '') {
      throw new Error('Senha inválida')
    }
    console.log(process.env.SALT_NUMBER)
    const passwordHash = await hash(password, 'fBp2hT6b')

    const user = usersRepositories.create({
      name, email, admin, password: passwordHash
    })

    await usersRepositories.save(user)

    return user
  }
}

export { CreateUserService }
