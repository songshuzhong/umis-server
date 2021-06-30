import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Project } from './project.model';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project)
    private readonly projectModel: typeof Project,
    private readonly sequelize: Sequelize,
  ) {}

  create(entity: any): Promise<Project> {
    const project = new Project();
    project.projectName = entity.name;
    project.projectDesc = entity.desc;
    project.projectTitle = entity.label;
    project.projectIcon = entity.icon;
    project.projectId = uuidv4();
    return project.save();
  }

  findOne(projectId: string): Promise<Project> {
    return this.projectModel.findOne({
      where: {
        projectId,
      },
    });
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.findAll();
  }

  async findAllByGroupId(groupId: string): Promise<Project[]> {
    return this.projectModel.findAll({
      where: {
        groupId,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await project.destroy();
  }
}
