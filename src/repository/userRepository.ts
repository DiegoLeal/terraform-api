import { UserType } from '../types/User';
import { prisma } from '../utils/prismaClient';

const saveUser = async (user: UserType) => {
	try {
		const saved = await prisma.users.create({
			data: {
				name: user.name,
				course: user.course,
				period: user.period,
			},
		});
		return saved;
	} catch (e) {
		throw new Error(e.message);
	}
};

const findByUserName = async (name: string) => {
	try {
		const user = await prisma.users.findUnique({
			where: {
				name,
			},
		});
		return user;
	} catch (e) {
		throw new Error(e.message);
	}
};

const findUserById = async (id: number) => {
	try {
		const user = prisma.users.findUnique({
			where: {
				id,
			}
		});
		return user;
	} catch (e) {
		throw new Error(e.message);
	}
};

export { saveUser, findByUserName, findUserById };
