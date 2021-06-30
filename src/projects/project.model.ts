import { ForeignKey, PrimaryKey, Column, Model, Table, BelongsToMany, BelongsTo } from 'sequelize-typescript';
import { Group } from '../group/group.model';
import { User } from '../users/user.model';
import { UsersProjects } from '../usersProjects/usersProjects.model';

@Table
export class Project extends Model<Project> {
  @PrimaryKey
  @Column
  projectId: string;

  @Column
  projectName: string;

  @Column
  projectTitle: string;

  @Column
  projectIcon: string;

  @Column
  projectDesc: string;

  @Column
  projectAvatar: string;

  @ForeignKey(() => Group)
  @Column
  groupId: string;

  @BelongsTo(() => Group)
  group: Group;

  @BelongsToMany(() => User, () => UsersProjects)
  users: User[];
}
