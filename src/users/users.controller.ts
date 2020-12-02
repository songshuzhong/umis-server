import { Body, Controller, Delete, Get, Param, Query, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('/api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/user')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put('/user')
  update(@Body() entity: User): Promise<User> {
    return this.usersService.updateOne(entity);
  }

  @Get('/users')
  async findAll(@Query('pageSize') pageSize: string, @Query('pageIndex') pageIndex: string, @Query('name') name: string): Promise<any> {
    const {rows, count} = await this.usersService.findAll(pageSize, pageIndex, name);
    return { rows, count };
  }

  @Get('/user')
  findOne(@Query('uid') uid: string): Promise<User> {
    return this.usersService.findOne(uid);
  }

  @Delete('/user')
  remove(@Query('uid') uid: string): Promise<void> {
    return this.usersService.remove(uid);
  }
}
