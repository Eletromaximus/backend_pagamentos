export interface ICustomErrors {
  status?: number,
  message: string
}

class CustomErrors {
  status: number
  message: string

  constructor ({ status, message }: ICustomErrors) {
    this.message = message

    this.status = status || 400
  }
}

export { CustomErrors }
