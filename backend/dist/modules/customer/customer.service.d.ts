import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { customerEntity } from "src/model/sql/customer.entity";
import { Repository } from "typeorm";
import { hash } from "src/helper/utils/hash";
export declare class CustomerService {
    private readonly customerRepository;
    private hash;
    constructor(customerRepository: Repository<customerEntity>, hash: hash);
    create(createCustomerDto: CreateCustomerDto): Promise<{
        id: string;
    }>;
    findAll(): Promise<customerEntity[]>;
    findOne(id: string): string;
    update(id: number, updateCustomerDto: UpdateCustomerDto): string;
    remove(id: string): Promise<boolean>;
}
