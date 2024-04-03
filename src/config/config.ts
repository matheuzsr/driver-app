import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const ConfigSchema = z.object({
  PORT: z.string().optional(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string()
})

type Config = {
  PORT?: string
  DB_HOST: string
  DB_PORT: string
  DB_NAME: string
  DB_USER: string
  DB_PASSWORD: string
}

const getConfig = (): Config => {
  const env = process.env
  const validatedConfig = ConfigSchema.parse(env)
  return validatedConfig
}

const config: Config = getConfig()

export default config
