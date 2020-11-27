import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Page } from './page.model';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
  imports: [SequelizeModule.forFeature([Page])],
  providers: [PageService],
  controllers: [PageController],
  exports: [PageService]
})
export class PageModule {}
