import { Request, Response } from 'express'
import { userService } from '../services/userServices'
import { eventService } from '../services/eventService'

async function signUp(req: Request, res: Response) {
	await userService.createUser(req.body)

	res.sendStatus(201)
}

export const userController = {
	signUp
}