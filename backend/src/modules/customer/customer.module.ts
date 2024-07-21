import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customerEntity } from 'src/model/sql/customer.entity';
import { hash } from 'src/helper/utils/hash';

@Module({
  imports:[TypeOrmModule.forFeature([customerEntity])],
  controllers: [CustomerController],
  providers: [CustomerService,hash],
})
export class CustomerModule {}
