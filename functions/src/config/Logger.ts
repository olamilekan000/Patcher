// tslint:disable-next-line: no-implicit-dependencies
require('dotenv').config()
import * as winston from 'winston'

const consoleTransport: any = new winston.transports.Console()
const myWinstonOptions: Object = {
  transports: [consoleTransport]
}
const logger: winston.Logger = winston.createLogger(myWinstonOptions)

if (process.env.NODE_ENV === 'TEST'){
  logger.transports.forEach((t) => (t.silent = true))
}

export default logger