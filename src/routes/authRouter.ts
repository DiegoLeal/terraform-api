import { Router } from 'express'
import { authController } from '../controllers/authController'

import { schemaValidation } from '../middlewares/schemaValidationMiddleware'
import { tokenValidation } from '../middlewares/tokenValidationMiddleware'
import { authSchema } from '../schemas/authSchema'

const authRouter = Router()

authRouter.post('/sign-in', schemaValidation(authSchema), authController.signIn)
authRouter.post('/token', tokenValidation, (req, res) => res.send('ok'))

export default authRouter
