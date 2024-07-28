import express from 'express'
import * as http from 'http'
import routes from './routes/user.routes'

export class Server {
  private readonly port: string
  private readonly app: express.Express
  private httpServer?: http.Server

  constructor (port: string) {
    this.port = port
    this.app = express()
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(routes)
  }

  async listen (): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      this.httpServer = this.app.listen(this.port, () => {
        console.log(
          `Mock backend App is running at http://localhost:${this.port}`
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
