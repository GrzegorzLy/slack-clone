import { MyContext } from 'src/MyContext';
import {combineResolvers } from 'graphql-resolvers'
import { isAuthenticated } from 'src/auth/utils';

export default {
  Query: {
    me: combineResolvers(isAuthenticated, (_: any, __: any, { user, services: { User } }: MyContext) => User.me(user && user.id)),
    getUser: (_: any, { id }: IEntity, { services: { User } }: MyContext) => User.get(id),
    allUsers: (_: any, __: any, { services: { User } }: MyContext) => User.all(),
  },
  Mutation: {
    register: (_: any, args: IRegister, { services: { User } }: MyContext) => User.register(args),
    login: (_: any, args: ILogin, { services: { User }, res }: MyContext) => User.login(args, res),
  },
};

interface IEntity {
  id: number;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  userName: string;
}
