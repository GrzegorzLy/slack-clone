import { Column, Model, Table, ForeignKey, BelongsToMany, BelongsTo, HasMany } from 'sequelize-typescript';
import Team from '../team/team.model';
import User from '../user/user.model';
import ChannelUser from '../channelUser/channelUser.model';
import Message from '../message/message.model';

@Table({
	tableName: 'channel',
})
export default class Channel extends Model<Channel> {
	@Column public name: string;
	@Column public public: boolean;

	@ForeignKey(() => Team)
	@Column
	teamId: number;

	@BelongsTo(() => Team)
	team: Team;

	@BelongsToMany(() => User, () => ChannelUser)
	public users?: User[];

	@HasMany(() => Message)
	messages: Message[];
}
// Channel.init({
//   name: DataTypes.STRING,
//   public: DataTypes.BOOLEAN,
// }, {
//   sequelize,
//   tableName: 'projects',
// });

// export default (sequelize: Sequelize, DataTypes: any) => {
//   const Channel = sequelize.define('channel', {
//     name: DataTypes.STRING,
//     public: DataTypes.BOOLEAN,
//   });

//   Channel.associate = (models) => {
//     Channel.belongsTo(models.Team, {
//       foreignKey: 'teamId',
//     });
//     Channel.belongsToMany(models.User, {
//       through: 'channelMember',
//       foreignKey: 'channelId',
//     });
//   };

//   return Channel;
// };
