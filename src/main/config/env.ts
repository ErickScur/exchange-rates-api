export default {
  jwtSecret: process.env.JWT_SECRET || 'fuadfhuadfhuad',
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  enviroment: process.env.ENVIROMENT || 'development',
}
