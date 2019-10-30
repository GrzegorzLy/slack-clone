import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import Channel from '../channel/channel.model';
import User from '../user/user.model';

@Table({
  tableName: 'channelUser',
})
export default class ChannelUser extends Model<ChannelUser> {
  @ForeignKey(() => Channel)
  @Column
  channelId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
