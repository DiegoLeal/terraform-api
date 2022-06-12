import bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import { userRepository } from '../repository/userRepository'
import * as error from '../utils/exceptions/errorUtils'

export type CreateUser = Omit<User, 'id'>

async function createUser(user: CreateUser) {
	const { username, password } = user

	const isUsernameTaken = await userRepository.findByUsername(username)
	if (isUsernameTaken) {
		throw error.conflict('This username is already taken')
	}

	const hashedPassword = bcrypt.hashSync(password, 10)

	await userRepository.create({ ...user, password: hashedPassword })
}

async function findById(id: number) {
	return await userRepository.findById(id)
}

export const userService = {
	createUser,
	findById
}
