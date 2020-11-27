import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Project extends Model<Project> {
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
}
