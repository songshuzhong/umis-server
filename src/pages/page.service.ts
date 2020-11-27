import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Page } from './page.model';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page)
    private readonly pageModel: typeof Page,
    private readonly sequelize: Sequelize,
  ) {}

  create(entity: any): Promise<Page> {
    const page = new Page();
    page.pageId = uuidv4();
    page.projectId = entity.projectId;
    page.pageName = entity.name;
    page.pageDesc = entity.desc;
    page.pageTitle = entity.label;
    page.pageIcon = entity.icon;
    return page.save();
  }

  findOne(pageId: string): Promise<Page> {
    return this.pageModel.findOne({
      where: {
        pageId,
      },
    });
  }

  updateOne(entity: Page): Promise<any> {
    return this.pageModel.update(entity, {where: {pageId: entity.pageId}});
  }

  async findAll(projectId: string): Promise<Page[]> {
    return this.pageModel.findAll({where: {projectId}});
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await project.destroy();
  }
}
