import { Request, Response } from 'express'

import connections from '../database/connection'

class ConnectionsController {
  async index(req: Request, res: Response) {
    const [total] = await (await connections('connections').count('* as total'))

    return res.json(total)
  }

  async store(req: Request, res: Response) {
    const { user_id } = req.body

    const trx = await connections.transaction()

    try {
      await trx('connections').insert({user_id})

      trx.commit()

      return res.status(201).send()
    } catch (e) {
      console.log(e)

      trx.rollback()

      return res.status(400).json({
        error: "Unexpected error"
      })
    }
  
  }
}

export default ConnectionsController