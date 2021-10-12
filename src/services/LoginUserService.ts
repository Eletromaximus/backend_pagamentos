import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'
import { hash } from 'bcryptjs'

interface ILoginRequest {
  email: string,
  password: string
}
export class LoginUserService {
  async execute ({ email, password }: ILoginRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories)
    const passwordHash = await hash(password, process.env.SALT_NUMBER)

    const user = await usersRepositories.findOne({
      where: { email: email }
    })

    console.log(user.email, user.password, passwordHash)

    if (user.email !== '' && user.password === passwordHash) {
      return true
    } else {
      return false
    }
    // const usersPlain = classToPlain(users)
    // console.log(usersPlain, users)

    // if (users !== [] && usersPlain.password === passwordHash) {
    //   return true
    // }

    // return classToPlain(users)
  }
}
