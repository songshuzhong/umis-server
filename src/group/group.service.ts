import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Group } from './group.model';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group)
    private readonly groupModel: typeof Group,
    private readonly sequelize: Sequelize,
  ) {}

  create(entity: any): Promise<Group> {
    const group = new Group();
    group.groupName = entity.name;
    group.groupDesc = entity.desc;
    group.groupTitle = entity.label;
    group.groupIcon = entity.icon;
    group.groupAvatar = entity.avatar;
    group.isFormData = entity.isFormData;
    group.groupStyle = entity.style;
    group.groupAdaptor = entity.adaptor;
    group.groupDomain = entity.domain;

    group.groupId = uuidv4();
    return group.save();
  }

  findOne(groupId: string): Promise<Group> {
    return this.groupModel.findOne({
      where: {
        groupId,
      },
    });
  }

  updateOne(entity: Group): Promise<any> {
    return this.groupModel.update(entity, {where: {groupId: entity.groupId || ''}});
  }

  async findAll(): Promise<Group[]> {
    return this.groupModel.findAll();
  }

  async remove(id: string): Promise<void> {
    const group = await this.findOne(id);
    await group.destroy();
  }
}
