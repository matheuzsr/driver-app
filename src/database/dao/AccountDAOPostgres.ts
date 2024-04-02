import pgp from 'pg-promise'
import { type Person } from '../../dto/PersonDto'

export default class AccountDAOPostgres {
  public async find (input: Person): Promise<Person> {
    const connection = pgp()('postgres://postgres:123456@localhost:5432/app')
    const [account] = await connection.query('select * from cccat15.account where email = $1', [input.email])

    await connection.$pool.end()

    return account
  }

  public async store (input: Person): Promise<{ accountId: string | undefined }> {
    const connection = pgp()('postgres://postgres:123456@localhost:5432/app')
    await connection.query('insert into cccat15.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)', [input.id, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver])

    await connection.$pool.end()

    return { accountId: input.id }
  }
}
