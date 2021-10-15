import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'
import bcrypt from 'bcryptjs'

interface ILoginRequest {
  email: string,
  password: string
}
export class LoginUserService {
  async execute ({ email, password }: ILoginRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories)

    const data = await usersRepositories.findOne({
      where: { email: email }
    })
      .then((result) => {
        return bcrypt.compare(password, result.password)
      })
      .catch(() => {
        return false
      })

    return data
  }
}
