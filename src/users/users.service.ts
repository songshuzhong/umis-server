import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

// @ts-ignore
const Op = Sequelize.Op;
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly sequelize: Sequelize,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.province = createUserDto.province;
    user.city = createUserDto.city;
    user.address = createUserDto.address;
    user.sex = createUserDto.sex;
    user.age = createUserDto.age;
    user.uid = uuidv4();
    return user.save();
  }

  findAll(pageSize, pageIndex, name, sex): Promise<any> {
    return this.userModel.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${name || ''}%`
        },
        sex: {
          [Op.like]: `%${sex || ''}%`
        }
      },
      order: [['createdAt', 'desc']],
      limit: Number(pageSize),
      offset: (Number(pageIndex) - 1) * Number(pageSize)
    });
  }

  findOne(uid: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        uid,
      },
    });
  }

  updateOne(entity: User): Promise<any> {
    return this.userModel.update(entity, {where: {uid: entity.uid || ''}});
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
