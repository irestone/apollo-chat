const {
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
  NODE_ENV,
  PORT
} = process.env

export const port = PORT || 8080
export const env = NODE_ENV || 'development'
export const inProduction = env === 'production'

export const db = {
  user: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  port: DB_PORT,
  name: DB_NAME
}
