export default {
  jwtSecret: process.env.JWT_SECRET || 'fuadfhuadfhuad',
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  enviroment: process.env.ENVIROMENT || 'development',
  exchangeRatesApiKey:
    process.env.EXCHANGERATESAPIKEY || 'pURjhI8X2712Rn914aliM267GdtUp8oL',
}
