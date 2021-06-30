import { PrimaryKey, Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { Project } from '../projects/project.model';
import { UsersProjects } from '../usersProjects/usersProjects.model';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Column
  uid: string;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column
  province: string;

  @Column
  city: string;

  @Column
  sex: string;

  @Column
  address: string;

  @Column
  age: string;

  @BelongsToMany(() => Project, () => UsersProjects)
  projects: Project[];
}
