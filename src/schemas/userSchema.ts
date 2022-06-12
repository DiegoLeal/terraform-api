import joi from 'joi'
import { CreateUser } from '../services/userServices'

export const userSchema = joi.object<CreateUser>({
	username: joi.string().max(20).required(),
	password: joi.string().min(6).required(),
	pictureUrl: joi.string().required()
})
