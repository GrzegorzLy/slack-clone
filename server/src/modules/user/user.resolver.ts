import { MyContext } from 'src/MyContext';

export default {
	Query: {
		getUser: (_: any, { id }: IGetUser, { services: { User } }: MyContext) => User.getUser(id),
		allUsers: (_: any, __: any, { services: { User } }: MyContext) => User.allUser(),
	},
	Mutation: {
		createUser: (_: any, args: ICreateUser, { services: { User } }: MyContext) => User.createUser(args),
	},
};

interface IGetUser {
	id: number;
}

interface ICreateUser {
	userName: string;
	email: string;
	password: string;
}
