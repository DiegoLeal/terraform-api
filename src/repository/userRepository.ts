import { prisma } from '../utils/prismaClient'
import { CreateUser } from '../services/userServices'

async function findByUsername(username: string) {
	return await prisma.user.findUnique({ where: { username } })
}

async function findById(id: number) {
	return await prisma.user.findFirst({ where: { id } })
}

async function create(data: CreateUser) {
	return prisma.user.create({
		data
	})
}

export const userRepository = {
	create,
	findById,
	findByUsername
}
