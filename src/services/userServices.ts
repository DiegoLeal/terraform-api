import { Prisma } from '@prisma/client';
import {
	findByUserName,
	findUserById,
	saveUser,
} from '../repository/userRepository';
import { UserType } from '../types/User';
import { notFoundException } from '../utils/exceptions/notFoundException';

const userRegister = async (user: UserType) => {
	try {
		const userExists = await findByUserName(user.name);

		if (!user.name || !user.course || !user.period) {
			throw new Error('Preencha todos os campos!');
		}

		if (userExists) {
			throw new Error('Usuário já cadastrado!');
		}

		const registered = await saveUser(user);
		return registered;
	} catch (e) {
		throw new Error(e.message);
	}
};

const userFindById = async (id) => {
	try {
		const user = await findUserById(id);
		if (!user) throw new Error(notFoundException('usuário'));
		return user;
	} catch (e) {
		throw new Error();
	}
};

export { userFindById, userRegister };
