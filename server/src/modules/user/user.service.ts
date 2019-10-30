import { hash, compare } from 'bcryptjs';
import { Repository } from 'sequelize-typescript';
import { Response } from 'express';
import User from './user.model';
import { IRegister, ILogin } from './user.resolver';
import { sendRefreshToken, createRefreshToken, createAccessToken } from '../../auth/utils';
import { AuthenticationError } from 'apollo-server-core';

class UserService {
	_userRepository: Repository<User>;

	constructor(model: Repository<User>) {
		this._userRepository = model;
	}

	me = (id: number | null) => {
		console.log(id);
		if (!id) {
			throw new AuthenticationError('Authentication error');
		}
		return this._userRepository.findOne({ where: { id } });
	};

	get = (id: number) => this._userRepository.findOne({ where: { id } });

	all = () => this._userRepository.findAll();

	register = async (arg: IRegister) => {
		try {
			const password = await hash(arg.password, 12);
			await this._userRepository.create({ ...arg, password });
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

	login = async ({ email, password }: ILogin, res: Response) => {
		const user = await this._userRepository.findOne({ where: { email } });
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
}

export default UserService;
