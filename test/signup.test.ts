import Signup, { type Input } from '../src/Signup'
import AccountDAOPostgres from '../src/database/dao/AccountDAOPostgres'

const dao = new AccountDAOPostgres()

test('should create passenger account', async () => {
  const input: Input = {
    name: 'John Doe',
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: '97456321558',
    isPassenger: true
  }

  const signup = new Signup(dao)
  const output = await signup.execute(input)
  expect(output.accountId).toBeDefined()
})

test('should create driver account', async () => {
  const input: Input = {
    name: 'John Doe',
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: '97456321558',
    carPlate: 'AAA0000',
    isDriver: true
  }

  const signup = new Signup(dao)
  const output = await signup.execute(input)

  expect(output.accountId).toBeDefined()
})

test('should return error on invalid car plate', async () => {
  const input: Input = {
    name: 'John Doe',
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: '97456321558',
    carPlate: '0000',
    isDriver: true
  }

  const signup = new Signup(dao)
  await expect(async () => await signup.execute(input)).rejects.toThrow(new Error('Invalid car plate'))
})

test('should return error on invalid car cpf', async () => {
  const input: Input = {
    name: 'John Doe',
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: '00000000000',
    carPlate: 'AAA0000',
    isDriver: true
  }

  const signup = new Signup(dao)
  await expect(async () => await signup.execute(input)).rejects.toThrow(new Error('Invalid car cpf'))
})

test('should return error on invalid car email', async () => {
  const input: Input = {
    name: 'John Doe',
    email: `john.doe${Math.random()}`,
    cpf: '97456321558',
    carPlate: 'AAA0000',
    isDriver: true
  }

  const signup = new Signup(dao)
  await expect(async () => await signup.execute(input)).rejects.toThrow(new Error('Invalid car email'))
})

test('should return error on invalid car name', async () => {
  const input: Input = {
    name: 'John 0',
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: '97456321558',
    isPassenger: true
  }

  const signup = new Signup(dao)
  await expect(async () => await signup.execute(input)).rejects.toThrow(new Error('Invalid car name'))
})

test('should return error on already exists', async () => {
  const input: Input = {
    name: 'John Doe',
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: '97456321558',
    isPassenger: true
  }

  const signup = new Signup(dao)
  await signup.execute(input)
  await expect(async () => await signup.execute(input)).rejects.toThrow(new Error('Already exists'))
})
