import pgp from 'pg-promise'
import { type Person } from '../../dto/PersonDto'
import config from '../../config/config'

export default class AccountDAOPostgres {
  private readonly uriDB = `res://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`

  public async find (input: Person): Promise<Person> {
    const connection = pgp()(this.uriDB)
    const [account] = await connection.query('select * from cccat15.account where email = $1', [input.email])

    await connection.$pool.end()

    return account
  }

  public async store (input: Person): Promise<{ accountId: string | undefined }> {
    const connection = pgp()(this.uriDB)
    await connection.query('insert into cccat15.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)', [input.id, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver])

    await connection.$pool.end()

    return { accountId: input.id }
  }
}
