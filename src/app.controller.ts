import {Controller, Get, Res, Render, Param, Query} from '@nestjs/common';
import { GroupService } from './group/group.service';
import { ProjectService } from './projects/project.service';
import { PageService} from './pages/page.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly  groupService: GroupService,
              private readonly  projectService: ProjectService,
              private readonly pageService: PageService
  ) {}

  @Get('/umis')
  @Render('index.ejs')
  async root1(@Res() res: Response): Promise<any> {
    const id = '0767bea4-c7e7-4aa7-a1b5-2fd5e1ec4a7f';
    const umisConfig = await this.groupService.findOne(id);
    const projects = await this.projectService.findAllByGroupId(id);
    const menu = await Promise.all(projects.map(async (item) => {
      const pages = await this.pageService.findAll(item.projectId);
      return {
        renderer: 'mis-menu-submenu',
        name: item.projectName,
        title: item.projectTitle,
        icon: item.projectIcon,
        body: pages.map(page => {
          return {
            renderer: 'mis-menu-item',
            name: page.pageName,
            title: page.pageTitle,
            icon: page.pageIcon,
            pageId: page.pageId,
            pageDesc: page.pageDesc,
            schemaUrl: `/api/page/${page.pageId}`
          }
        })
      };
    }));

    return {
      menu,
      umisConfig: {
        style: umisConfig.groupStyle,
        adaptor: umisConfig.groupAdaptor,
        isFormData: umisConfig.isFormData
      }
    };
  }

  @Get('/api/menu/:id')
  async menu(@Param('id')id: string): Promise<any> {
    const umisConfig = await this.groupService.findOne(id);
    const projects = await this.projectService.findAllByGroupId(id);
    const menu = await Promise.all(projects.map(async (item) => {
      const pages = await this.pageService.findAll(item.projectId);
      return {
        renderer: 'mis-menu-submenu',
        name: item.projectName,
        title: item.projectTitle,
        icon: item.projectIcon,
        body: pages.map(page => {
          return {
            renderer: 'mis-menu-item',
            name: page.pageName,
            title: page.pageTitle,
            icon: page.pageIcon,
            pageId: page.pageId,
            pageDesc: page.pageDesc,
            schemaUrl: `/api/page/${page.pageId}`
          }
        })
      };
    }));

    return {
      menu,
      umisConfig: {
        style: umisConfig.groupStyle,
        adaptor: umisConfig.groupAdaptor,
        isFormData: umisConfig.isFormData
      }
    };
  }
}
