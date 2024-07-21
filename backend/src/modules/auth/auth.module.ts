import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customerEntity } from 'src/model/sql/customer.entity';
import { Token } from 'src/helper/utils/token';
import { hash } from 'src/helper/utils/hash';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    TypeOrmModule.forFeature([customerEntity]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService,Token,hash],
})
export class AuthModule {}
