import 'dotenv/config'

const config = {
  port: process.env.PORT,
  kafkaPort: process.env.KAFKA_PORT,
  host:  process.env.HOST,
}

export default config;