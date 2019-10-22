import app from './server'
import logger from './config/Logger'

let PORT = 0

if(process.env.NODE_ENV === 'TEST'){
  PORT = 9094
}else {
  PORT = 9093
}

app.listen(process.env.PORT || PORT, () => {
  logger.info(`App now listening for requests ${PORT}`)
})

export default app
