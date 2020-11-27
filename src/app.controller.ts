import { Controller, Get, Res, Render } from '@nestjs/common';
import { ProjectService } from './projects/project.service';
import { PageService} from './pages/page.service';
import { Response } from 'express';

@Controller('/')
export class AppController {
  constructor(private readonly  projectService: ProjectService, private readonly pageService: PageService) {}

  @Get('/home')
  @Render('index.njk')
  async root1(@Res() res: Response): Promise<any> {
    const projects = await this.projectService.findAll();
    const initData = await Promise.all(projects.map(async (item) => {
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
            schemaUrl: `/api/page`
          }
        })
      };
    }));
    // return res.render('index', {message: initData[0]});
    return {initData: JSON.stringify(initData)};
  }
}
