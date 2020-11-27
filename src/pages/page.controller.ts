import { Body, Controller, Delete, Get, Param, Query, Post, Put } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { Page } from './page.model';
import { PageService } from './page.service';

@Controller('/api')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post('/page')
  create(@Body() entity: any): Promise<Page> {
    return this.pageService.create(entity);
  }

  @Get('/page')
  findOne(@Query() query): Promise<Page> {
    return this.pageService.findOne(query.id);
  }

  @Put('/page')
  updateOne(@Body() entity: any): Promise<Page> {
    return this.pageService.updateOne(entity);
  }

  @Delete('/page')
  remove(@Param('id') id: string): Promise<void> {
    return this.pageService.remove(id);
  }
}
