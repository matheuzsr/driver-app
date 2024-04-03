import crypto from 'crypto'
import { validateCpf } from './validateCpf'
import AccountDAOPostgres from './database/dao/AccountDAOPostgres'
import { type Person } from './dto/PersonDto'
import { ValidationError } from './error/ValidationError'
import { BusinessError } from './error/BusinessError'

export default class Signup {
  constructor (readonly dao: AccountDAOPostgres) {
    this.dao = new AccountDAOPostgres()
  }

  public async execute (input: Input): Promise<{ accountId: string | undefined }> {
    const id = crypto.randomUUID()
    const account = await this.dao.find(input)

    if (account) throw new BusinessError('Already exists')
    if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new ValidationError('Invalid car name')
    if (!input.email.match(/^(.+)@(.+)$/)) throw new ValidationError('Invalid car email')
    if (!validateCpf(input.cpf)) throw new ValidationError('Invalid car cpf')
    if (input?.isDriver && !input?.carPlate?.match(/[A-Z]{3}[0-9]{4}/)) throw new ValidationError('Invalid car plate')

    const { accountId } = await this.dao.store({ ...input, id })
    return { accountId }
  }
}

export interface Input extends Person {

}
