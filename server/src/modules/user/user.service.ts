import User from './user.model';
import { Repository } from 'sequelize-typescript';

export const get = (model: Repository<User>) => (id: number) => model.findOne({ where: { id } });
export const all = (model: Repository<User>) => () => model.findAll();
export const create = (model: Repository<User>) => (arg: any) => model.create(arg);

const UserController = (model: Repository<User>): IUserServices => ({
	getUser: get(model),
	allUser: all(model),
	createUser: create(model),
});

export interface IUserServices {
	getUser: (id: number) => Promise<User | null>;
	allUser: () => Promise<User[]>;
	createUser: (arg: any) => Promise<User>;
}

export default UserController;
