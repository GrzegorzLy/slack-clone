import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import Team from '../team/team.model';
import User from '../user/user.model';

@Table({
  tableName: 'teamUser',
})
export default class TeamUser extends Model<TeamUser> {
  @ForeignKey(() => Team)
  @Column
  teamId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
