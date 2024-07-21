import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { customerEntity } from 'src/model/sql/customer.entity';
import { Repository } from 'typeorm';
import { hash } from 'src/helper/utils/hash';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { UpdateCustomerDto } from '../customer/dto/update-customer.dto';
import { Token } from 'src/helper/utils/token';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(customerEntity)
    private readonly cutomerRepository:Repository<customerEntity>,

    private hash:hash,

    private token:Token

     ){}

  async signIn(createAuthDto: CreateCustomerDto) {
   const customer=await this.cutomerRepository.findOne({where:{email:createAuthDto.email}});
   const JwtPayload={
    sub:customer.id,
    email:customer.email
   }
  return await this.hash.verifyHashing(customer.password,createAuthDto.password)&&(
  { access_token: await this.token.generateAcessToken(JwtPayload)}
   ) 
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateCustomerDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
