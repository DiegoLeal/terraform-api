import { Event } from '@prisma/client'
import { listRepository } from '../repository/listRepository'
import { eventRepository } from '../repository/eventRepository'
import * as error from '../utils/exceptions/errorUtils'

async function getLists(userId: number) {
	const lists = await listRepository.getLists(userId)
	return lists
}

async function createList(userId: number, name: string, events: Event[]) {
	const list = await listRepository.createList(userId, name)

	for (const event of events) await eventRepository.upsert(event)

	events.map(async (event) => {
		await listRepository.addEventToList(list.id, event.tmdbId)
	})
}

async function deleteList(id: number, userId: number) {
	const list = await listRepository.findListById(id)

	if (!list) {
		throw error.notFound('This list does not exist')
	}

	if (userId !== list.userId) {
		throw error.unauthorized("This list it's not yours to delete")
	}

	await listRepository.deleteList(list.id)
}

export const listService = {
	createList,
	deleteList,
	getLists
}
