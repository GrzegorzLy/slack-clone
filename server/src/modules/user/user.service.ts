import { hash, compare } from 'bcryptjs';

import User from './user.model';
import { Repository } from 'sequelize-typescript';
import { IRegister, ILogin, ILoginResponse, IRegisterResponse } from './user.resolver';
import { sendRefreshToken, createRefreshToken, createAccessToken } from '../../auth/utils';
import { Response } from 'express';

export const get = (model: Repository<User>) => (id: number) => model.findOne({ where: { id } });

export const all = (model: Repository<User>) => () => model.findAll();

export const register = (model: Repository<User>) => async (arg: IRegister): Promise<IRegisterResponse> => {
	try {
		const password = await hash(arg.password, 12);
		await model.create({ ...arg, password });
		return {
			success: true,
			error: null,
		};
	} catch (err) {
		return {
			success: false,
			error: err.toString(),
		};
	}
};

export const login = (model: Repository<User>) => async ({ email, password }: ILogin, res: Response) => {
	const user = await model.findOne({ where: { email } });
	if (!user) {
		throw new Error('authentication failed!');
	}
	const valid = await compare(password, user.password);
	if (!valid) {
		throw new Error('authentication failed!');
	}
	sendRefreshToken(res, createRefreshToken(user));
	return {
		accessToken: createAccessToken(user),
	};
};

const UserController = (model: Repository<User>): IUserServices => ({
	get: get(model),
	all: all(model),
	register: register(model),
	login: login(model),
});

export interface IUserServices {
	get: (id: number) => Promise<User | null>;
	all: () => Promise<User[]>;
	register: (arg: any) => Promise<IRegisterResponse>;
	login: (arg: any, res: Response) => Promise<ILoginResponse>;
}

export default UserController;
