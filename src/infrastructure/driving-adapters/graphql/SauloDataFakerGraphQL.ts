import { GraphQL } from './GraphQL'

export class SauloDataFakerGraphQL {
  private _graphSQL?: GraphQL

  async start (): Promise<void> {
    const port: string = process.env.GRAPH_PORT ?? '4001'
    this._graphSQL = new GraphQL(port)
    return await this._graphSQL.listen()
  }

  async stop (): Promise<void> {
    return await this._graphSQL?.stop()
  }
}
