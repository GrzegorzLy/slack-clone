import { Column, Model, Table, ForeignKey, BelongsToMany, BelongsTo, HasMany } from 'sequelize-typescript';
import User from '../user/user.model';
import TeamUser from '../teamUser/teamUser.model';
import Channel from '../channel/channel.model';

@Table({
	tableName: 'team',
})
export default class Team extends Model<Team> {
	@Column({ unique: true })
	public name: string;

	@ForeignKey(() => User)
	@Column
	ownerId: number;

	@BelongsTo(() => User)
	owner: User;

	@BelongsToMany(() => User, () => TeamUser)
	public users?: User[];

	@HasMany(() => Channel)
	channels: Channel[];
}
