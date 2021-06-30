import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { PageModule } from './pages/page.module';
import { ProjectModule } from './projects/project.module';
import { GroupModule } from './group/group.module';
import { UsersProjectsModule } from './usersProjects/usersProjects.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test',
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    PageModule,
    ProjectModule,
    GroupModule,
    UsersProjectsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
