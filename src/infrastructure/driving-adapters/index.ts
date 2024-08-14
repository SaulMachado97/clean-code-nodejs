import 'module-alias/register'
import path from 'path'
import * as dotenv from 'dotenv'
import { SauloAPIBackend } from '@infrastructure/driving-adapters/api-rest/SauloAPIBackend'
import { SauloDataFakerGraphQL } from './graphql/SauloDataFakerGraphQL'

try {
  dotenv.config({
    path: path.resolve(__dirname, '../../../.env')
  })

  new SauloAPIBackend().start()
  new SauloDataFakerGraphQL().start()
} catch (error) {
  console.log(error)
}
