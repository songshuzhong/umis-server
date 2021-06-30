import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Controller('/api')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/project')
  async findAll(): Promise<any> {
    const rows = await this.projectService.findAll();
    return {rows}
  }

  @Get('/project/:id')
  async findAllByGroupId(@Param('id')id: string): Promise<any> {
    const rows = await this.projectService.findAllByGroupId(id);
    return {rows}
  }

  @Get('/projects/combo')
  async findCombo(): Promise<any> {
    const rows = await this.projectService.findAll();
    const result = rows.map((item: any) => {
      const combo = {
        value: '',
        text: ''
      };
      combo.value = item.projectId;
      combo.text = item.projectTitle;
      return combo;
    });
    result.push({
      value: 'root',
      text: 'root'
    });
    return {rows: result}
  }

  @Post('/project')
  create(@Body() entity: any): Promise<Project> {
    return this.projectService.create(entity);
  }

  @Get('/project/:id')
  findOne(@Param('id') id: string): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @Delete('/project/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.projectService.remove(id);
  }
}
