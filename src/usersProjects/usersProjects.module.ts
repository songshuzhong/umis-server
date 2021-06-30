import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersProjects } from './usersProjects.model';

@Module({
  imports: [SequelizeModule.forFeature([UsersProjects])],
})
export class UsersProjectsModule {}
