import * as Cloud from '@google-cloud/storage';
import * as path from 'path'

const serviceKey = path.join(__dirname, './storage.json')

const { Storage } = Cloud

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'hacker-bay',
})

export default storage
