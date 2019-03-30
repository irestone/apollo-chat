const {
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
  NODE_ENV = 'development',
  PORT = 8080,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  SESS_LIFETIME = 3600000,
  SESS_NAME = 'sid',
  SESS_SECRET = 'secret'
} = process.env

export const port = PORT
export const env = NODE_ENV
export const inProduction = env === 'production'

export const db = {
  user: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  port: DB_PORT,
  name: DB_NAME
}

export const session = {
  name: SESS_NAME,
  secret: SESS_SECRET,
  lifetime: parseInt(SESS_LIFETIME)
}

export const redis = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  pass: REDIS_PASSWORD
}
