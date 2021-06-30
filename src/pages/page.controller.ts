import { Body, Controller, Delete, Get, Param, Query, Post, Put } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { Page } from './page.model';
import { PageService } from './page.service';

@Controller('/api')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  sleep(ms) {
    return new Promise(resovle => {
      const timer = setTimeout(function () {
        clearTimeout(timer);
        resovle();
      }, ms);
    });
  }

  @Post('/page')
  create(@Body() entity: any): Promise<Page> {
    return this.pageService.create(entity);
  }

  @Get('/page/:id')
  async findOne(@Param('id')id: string): Promise<Page> {
    await this.sleep(1000);
    return this.pageService.findOne(id);
  }

  @Get('/pages')
  async findAll(@Query() query): Promise<any> {
    return await this.pageService.findAllByPagination(query.id, query.pageSize, query.pageIndex);
  }

  @Put('/page')
  updateOne(@Body() entity: any): Promise<Page> {
    return this.pageService.updateOne(entity);
  }

  @Delete('/page')
  remove(@Query() query): Promise<void> {
    return this.pageService.remove(query.id);
  }
}
