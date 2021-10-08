import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'
import { hash } from 'bcryptjs'
import { ValidationError } from 'yup'

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
      throw new ValidationError('Email', 'Email não válido')
    }

    const userAlreadyExist = await usersRepositories.findOne({
      email
    })

    if (userAlreadyExist) {
      throw new ValidationError('Email', 'Usuário já está registrado')
    }

    if (password === '') {
      throw new ValidationError('Senha', 'Senha inválida')
    }
    const passwordHash = await hash(password, 8)

    const user = usersRepositories.create({
      name, email, admin, password: passwordHash
    })

    await usersRepositories.save(user)

    return user
  }
}

export { CreateUserService }
