const { NODE_ENV, PORT, MONGODB_URI } = process.env

export const env = NODE_ENV || 'development'
export const port = PORT || 8080
export const dbURI = MONGODB_URI
