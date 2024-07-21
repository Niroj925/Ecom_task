import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { itemEntity } from 'src/model/sql/item.entity';

@Module({
  imports:[TypeOrmModule.forFeature([itemEntity])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
