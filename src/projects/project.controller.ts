import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Controller('/api/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(): Promise<any> {
    const rows = await this.projectService.findAll();
    return {rows}
  }

  @Post()
  create(@Body() entity: any): Promise<Project> {
    return this.projectService.create(entity);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.projectService.remove(id);
  }
}
