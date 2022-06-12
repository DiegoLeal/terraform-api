import { Request, Response } from 'express'
import { eventService } from '../services/eventService'

async function addOrUpdateEvent(req: Request, res: Response) {
	const { action, status } = req.params
	const eventData = req.body
	const { userId } = res.locals

	let actionStatus = false

	if (status === 'true') actionStatus = true

	await eventService.upsertEvent(userId, eventData, action, actionStatus)

	res.sendStatus(201)
}

async function getEvent(req: Request, res: Response) {
	const { userId } = res.locals
	const { eventId } = req.params

	const event = await eventService.getUserEvent(+userId, +eventId)
	res.send(event)
}

async function getUserEvents(req: Request, res: Response) {
	const { userId } = res.locals
	const { filter } = req.params

	const events = await eventService.getUserEvents(+userId, filter)

	res.send(events)
}

export const eventController = {
	addOrUpdateEvent,
	getEvent,
	getUserEvents
}
