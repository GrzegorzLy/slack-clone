import { Column, Model, Table, BelongsToMany, HasMany } from 'sequelize-typescript';
import Channel from '../channel/channel.model';
import ChannelUser from '../channelUser/channelUser.model';
import Team from '../team/team.model';
import TeamUser from '../teamUser/teamUser.model';
import Message from '../message/message.model';

@Table({
  tableName: 'user',
})
export default class User extends Model<User> {
  @Column({ unique: true })
  public userName: string;

  @Column({ unique: true })
  public email: string;

  @Column public password: string;

  @BelongsToMany(() => Channel, () => ChannelUser)
  public channels?: Channel[];

  @BelongsToMany(() => Team, () => TeamUser)
  public teams?: Team[];

  @HasMany(() => Message)
  messages: Message[];

  @HasMany(() => Team)
  ownersTeams: Team[];
}
