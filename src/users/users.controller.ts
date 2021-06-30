import { Body, Controller, Delete, Get, Param, Query, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('/api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  sleep(ms) {
    return new Promise(resovle => {
      const timer = setTimeout(function () {
        clearTimeout(timer);
        resovle();
      }, ms);
    });
  }
  @Post('/user')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    await this.sleep(1000);
    return this.usersService.create(createUserDto);
  }

  @Put('/user')
  async update(@Body() entity: User): Promise<User> {
    await this.sleep(1000);
    return this.usersService.updateOne(entity);
  }

  @Get('/users')
  async findAll(
    @Query('pageSize') pageSize: string,
    @Query('pageIndex') pageIndex: string,
    @Query('perPage') perPage: string,
    @Query('page') page: string,
    @Query('name') name: string,
    @Query('sex') sex: string
  ): Promise<any> {
    const currentPage = pageIndex || page;
    const size = pageSize || perPage;
    const {rows, count} = await this.usersService.findAll(size, currentPage, name, sex);
    return { rows, count };
  }

  @Get('/user')
  async findOne(@Query('uid') uid: string): Promise<User> {
    await this.sleep(2000);
    return this.usersService.findOne(uid);
  }

  @Delete('/user')
  async remove(@Query('uid') uid: string): Promise<void> {
    await this.sleep(6000);
    return this.usersService.remove(uid);
  }
}
