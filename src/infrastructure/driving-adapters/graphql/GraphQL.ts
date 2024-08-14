import express, { json } from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import * as http from 'http'
import cors from 'cors'
import schema from './schema'

export class GraphQL {
  private readonly port: string
  private readonly app: express.Express
  private httpServer?: http.Server
  private readonly apolloServer: ApolloServer

  constructor (port: string) {
    this.port = port
    this.app = express()
    this.apolloServer = new ApolloServer({
      schema
    })
  }

  async listen (): Promise<void> {
    await this.apolloServer.start()

    // Cors Options (May or may not be necessary)
    const corsOptions: cors.CorsOptions = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204
    }

    this.app.use(
      '/graphql',
      cors<cors.CorsRequest>(corsOptions),
      json(),
      expressMiddleware(this.apolloServer)
    )

    await new Promise<void>((resolve, reject) => {
      this.httpServer = this.app.listen(this.port, () => {
        console.log(
          `GraphQL App is running at http://localhost:${this.port}/graphql`
        )
        console.log(' Press CTRL + C to stop \n')
        resolve()
      })

      this.httpServer.on('error', (err) => {
        reject(err) // La promesa se rechaza si hay un error al iniciar el servidor
      })
    })
  }

  async stop (): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (this.httpServer != null) {
        this.httpServer.close(error => {
          if (error != null) {
            reject(error)
          }
          resolve()
        })
      }
      resolve()
    })
  }
}
