import { Event } from '@prisma/client'
import { prisma } from '../utils/prismaClient'

async function findById(id: number) {
	return await prisma.event.findFirst({
		where: { tmdbId: id }
	})
}

async function upsert(eventData: Event) {
	return await prisma.event.upsert({
		where: { tmdbId: eventData.tmdbId },
		update: {},
		create: eventData
	})
}

async function findUserEvent(eventId: number, userId: number) {
	return await prisma.userEvents.findFirst({
		where: {
			eventId,
			userId
		}
	})
}

async function createUserEvent(
	eventId: number,
	userId: number,
	action: string,
	status: boolean
) {
	return await prisma.userEvents.create({
		data: {
			eventId,
			userId,
			[action]: status
		}
	})
}

async function updateUserEvent(id: number, action: string, status: boolean) {
	return await prisma.userEvents.update({
		where: {
			id
		},
		data: {
			[action]: status
		}
	})
}

async function getUserEvent(id: number, eventId: number) {
	return await prisma.userEvents.findFirst({
		where: {
			userId: id,
			eventId: eventId
		}
	})
}

async function getUserEvents(id: number, filter: string) {
	return await prisma.userEvents.findMany({
		where: {
			userId: id,
			[filter]: true
		},
		select: {
			id: true,
			events: true
		}
	})
}

async function removeUserEvent(eventId: number) {
	return await prisma.userEvents.delete({
		where: {
			id: eventId
		}
	})
}

export const eventRepository = {
	createUserEvent,
	findById,
	findUserEvent,
	getUserEvent,
	getUserEvents,
	removeUserEvent,
	updateUserEvent,
	upsert
}
