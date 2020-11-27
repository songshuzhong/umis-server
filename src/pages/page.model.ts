import { Column, Model, Table, PrimaryKey } from 'sequelize-typescript';

@Table
export class Page extends Model<Page> {
  @Column
  projectId: string;

  @PrimaryKey
  @Column
  pageId: string;

  @Column
  pageName: string;

  @Column
  pageTitle: string;

  @Column
  pageIcon: string;

  @Column
  pageDesc: string;

  @Column
  pageSchema: string;
}
