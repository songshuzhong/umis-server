import { PrimaryKey, Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Project } from '../projects/project.model';

@Table
export class Group extends Model<Group> {
  @PrimaryKey
  @Column
  groupId: string;

  @Column
  groupName: string;

  @Column
  groupTitle: string;

  @Column
  groupIcon: string;

  @Column
  groupDesc: string;

  @Column
  groupAvatar: string;

  @Column
  isFormData: boolean;

  @Column
  groupStyle: string;

  @Column
  groupAdaptor: string;

  @Column
  groupDomain: string;

  @HasMany(() => Project)
  projects: Project[];
}
