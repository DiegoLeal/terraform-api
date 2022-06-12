import { Router } from 'express'
import { eventController } from '../controllers/eventController'
import { tokenValidation } from '../middlewares/tokenValidationMiddleware'

const eventRouter = Router()

eventRouter.post(
	'/events/:action/:status',
	tokenValidation,
	eventController.addOrUpdateEvent
)

export default eventRouter
