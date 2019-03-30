const {
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
  NODE_ENV,
  PORT,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  SESSION_LIFETIME,
  SESSION_NAME,
  SESSION_SECRET
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
  name: SESSION_NAME,
  secret: SESSION_SECRET,
  lifetime: parseInt(SESSION_LIFETIME)
}

export const redis = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  pass: REDIS_PASSWORD
}
