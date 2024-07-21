import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { packageEntity } from 'src/model/sql/package.entity';
import { itemEntity } from 'src/model/sql/item.entity';

@Module({
  imports:[TypeOrmModule.forFeature([packageEntity,itemEntity])],
  controllers: [PackageController],
  providers: [PackageService],
})
export class PackageModule {}
