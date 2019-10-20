import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Channel from '../channel/channel.model';
import User from '../user/user.model';

@Table({
	tableName: 'message',
})
export default class Message extends Model<Message> {
	@Column public text: string;

	@ForeignKey(() => User)
	@Column
	userId: number;

	@ForeignKey(() => Channel)
	@Column
	channelId: number;

	@BelongsTo(() => User)
	user: User;

	@BelongsTo(() => Channel)
	channel: Channel;
}

// export default (sequelize, DataTypes) => {
//   const Message = sequelize.define('message', {
//     text: DataTypes.STRING,
//   });

//   Message.associate = (models) => {
//     // 1:M
//     Message.belongsTo(models.Channel, {
//       foreignKey: {
//         name: 'channelId',
//         field: 'channel_id',
//       },
//     });
//     Message.belongsTo(models.User, {
//       foreignKey: {
//         name: 'userId',
//         field: 'user_id',
//       },
//     });
//   };

//   return Message;
// };
