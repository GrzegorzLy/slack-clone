import { MyContext } from 'src/MyContext';

export default {
	Query: {
		getUser: (_: any, { id }: IGetUser, { services: { User } }: MyContext) => User.get(id),
		allUsers: (_: any, __: any, { services: { User } }: MyContext) => User.all(),
	},
	Mutation: {
		register: (_: any, args: IRegister, { services: { User } }: MyContext) => User.register(args),
		login: (_: any, args: ILogin, { services: { User }, res }: MyContext) => User.login(args, res),
	},
};

interface IGetUser {
	id: number;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface IRegister extends ILogin {
	userName: string;
}

export interface ILoginResponse {
	accessToken: string;
}

export interface IRegisterResponse {
	success: boolean;
	error: string | null;
}
