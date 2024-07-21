import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { customerEntity } from "src/model/sql/customer.entity";
import { Repository } from "typeorm";
import * as agron from "argon2";
import { hash } from "src/helper/utils/hash";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(customerEntity)
    private readonly customerRepository: Repository<customerEntity>,

    private hash: hash
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { email, password } = createCustomerDto;
    const existingCustomer = await this.customerRepository.findOne({
      where: { email },
    });
    if (existingCustomer) {
      return { id: existingCustomer.id };
    } else {
      const customer = this.customerRepository.create({
        email,
        password:
          password && (await this.hash.value(createCustomerDto.password)),
      });
      const newCustomer = await this.customerRepository.save(customer);
      return { id: newCustomer.id };
    }
  }

  async findAll() {
    return await this.customerRepository.find({ select: ["id", "email"] });
  }

  findOne(id: string) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  async remove(id: string) {
    await this.customerRepository.delete({ id });
    return true;
  }
}
