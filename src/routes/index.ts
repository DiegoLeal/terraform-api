import { Router } from 'express'
import authRouter from './authRouter'
import eventRouter from './eventRouter'
import userRouter from './userRouter'

const router = Router()

router.use(authRouter)
router.use(eventRouter)
router.use('/users', userRouter)

export default router
