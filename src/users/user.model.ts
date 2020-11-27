import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column
  name: string;

  @Column
  uid: string;

  @Column
  email: string;

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
}
