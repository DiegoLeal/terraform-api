import { Event } from '@prisma/client'
import { eventRepository } from '../repository/eventRepository'

async function upsertEvent(
	userId: number,
	eventData: Event,
	action: string,
	status: boolean
) {
	const { tmdbId } = eventData

	await eventRepository.findById(tmdbId)

	await eventRepository.upsert(eventData)

	const userEvent = await eventRepository.getUserEvent(userId, tmdbId)

	if (!userEvent) {
		await eventRepository.createUserEvent(tmdbId, userId, action, status)
		return
	}

	const eventUpdated = await eventRepository.updateUserEvent(
		userEvent.id,
		action,
		status
	)

	if (
		!eventUpdated.favorite &&
		!eventUpdated.watched &&
		!eventUpdated.watchlist
	)
		await eventRepository.removeUserEvent(eventUpdated.id)
}

async function getUserEvent(id: number, eventId: number) {
	return await eventRepository.getUserEvent(id, eventId)
}

async function getUserEvents(id: number, filter: string) {
	return await eventRepository.getUserEvents(id, filter)
}

export const eventService = {
	getUserEvent,
	getUserEvents,
	upsertEvent
}
