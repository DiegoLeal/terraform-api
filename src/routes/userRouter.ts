import { Router } from 'express'
import { listController } from '../controllers/listController'
import { eventController } from '../controllers/eventController'
import { userController } from '../controllers/userController.js'
import { schemaValidation } from '../middlewares/schemaValidationMiddleware'
import { tokenValidation } from '../middlewares/tokenValidationMiddleware'
import { userSchema } from '../schemas/userSchema'

const userRouter = Router()

userRouter.post(
	'/register',
	schemaValidation(userSchema),
	userController.signUp
)

userRouter.get('/events/:eventId', tokenValidation, eventController.getEvent)

userRouter.get(
	'/events/list/:filter',
	tokenValidation,
	eventController.getUserEvents
)

userRouter.get('/lists', tokenValidation, listController.getLists)

userRouter.post('/lists/create', tokenValidation, listController.createList)

userRouter.delete(
	'/lists/:id/delete',
	tokenValidation,
	listController.deleteList
)

export default userRouter
