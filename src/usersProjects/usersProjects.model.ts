import { ForeignKey, Column, Model, Table } from 'sequelize-typescript';
import { Project } from '../projects/project.model';
import { User } from '../users/user.model';

@Table
export class UsersProjects extends Model<any>{
  @ForeignKey(() => Project)
  @Column
  projectId: string;

  @ForeignKey(() => User)
  @Column
  uid: string;
}
