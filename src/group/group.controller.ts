import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { Group } from './group.model';
import { GroupService } from './group.service';

@Controller('/api')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('/groups')
  async findAll(): Promise<any> {
    const rows = await this.groupService.findAll();
    return {rows}
  }

  @Post('/group')
  create(@Body() entity: any): Promise<Group> {
    return this.groupService.create(entity);
  }

  @Put('/group')
  async update(@Body() entity: Group): Promise<Group> {
    return this.groupService.updateOne(entity);
  }

  @Get('/group/:id')
  findOne(@Param('id') id: string): Promise<Group> {
    return this.groupService.findOne(id);
  }

  @Delete('/group/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.groupService.remove(id);
  }
}
