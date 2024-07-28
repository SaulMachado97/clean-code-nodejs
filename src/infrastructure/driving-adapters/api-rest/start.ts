import * as dotenv from 'dotenv'
import path from 'path'
import { SauloAPIBackend } from './SauloAPIBackend'

try {
  dotenv.config({
    path: path.resolve(__dirname, '../../../../.env')
  })

  new SauloAPIBackend().start()
} catch (error) {
  console.log(error)
}
