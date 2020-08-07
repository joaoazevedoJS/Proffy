import { Router } from 'express'

import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'

const routes = Router()

const classes = new ClassesController()
const connections = new ConnectionsController()

routes.post('/classes', classes.store)
routes.get('/classes', classes.index)


routes.post('/connections', connections.store)
routes.get('/connections', connections.index)

export default routes