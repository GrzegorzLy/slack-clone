import { MyContext } from 'src/MyContext';
import Team from './team.model';

export default {
	Team: {
		owner: ({ id }: Team, _: Team, { services: { User } }: MyContext) => User.getUser(id),
		members: (_: Team, __: Team, { services: { User } }: MyContext) => User.allUser(),
	},
	Query: {
		getTeam: (_: Team, { id }: Team, { services: { User } }: MyContext) => User.getUser(id),
	},
	Mutation: {
		createTeam: async (_: Team, __: any, { services: { User }, user }: MyContext) => {
			try {
				// if (user && user.id) {
				// 	await models.Team.create({ ...args, ownerId: user.id });
				// 	return true;
				// }
				console.log(User, user);
				return false;
			} catch (err) {
				console.log(err);
				return false;
			}
		},
	},
};
