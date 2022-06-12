import { prisma } from '../utils/prismaClient'

async function getLists(userId: number) {
	return await prisma.list.findMany({
		where: {
			userId
		},
		select: {
			id: true,
			name: true,
			listEvents: {
				select: {
					events: true
				}
			}
		}
	})
}

async function findListById(listId: number) {
	const list = await prisma.list.findUnique({
		where: {
			id: listId
		}
	})

	return list
}

async function createList(userId: number, name: string) {
	const list = await prisma.list.create({
		data: {
			name,
			userId
		}
	})

	return list
}

async function addEventToList(listId: number, eventId: number) {
	return await prisma.listEvents.create({
		data: {
			listId,
			eventId
		}
	})
}

async function deleteList(id: number) {
	return await prisma.list.delete({
		where: {
			id
		}
	})
}

export const listRepository = {
	addEventToList,
	createList,
	deleteList,
	findListById,
	getLists
}
