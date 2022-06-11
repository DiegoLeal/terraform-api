import { Router } from 'express';
import {
	userFindById,
	userRegister,
} from '../services/userServices';

const userRouter = Router();

userRouter.post('/register', async (req, res) => {
	try {
		await userRegister(req.body);
		res.status(201).json({ sucesso: 'Usuário cadastrado com Sucesso' });
	} catch (err) {
		const e = err as Error;
		res.status(400).json({ error: e.message });
	}
});

userRouter.get('/:id', async (req, res) => {
	try {
		const user = await userFindById(req.params.id);
		res.status(200).json({ user: user });
	} catch (err) {
		const e = err as Error;
		res.status(400).json({ error: e.message });
	}
});

export { userRouter };
