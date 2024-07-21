import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(createCustomerDto: CreateCustomerDto): Promise<{
        id: string;
    }>;
    findAll(): Promise<import("../../model/sql/customer.entity").customerEntity[]>;
    findOne(id: string): string;
    update(id: string, updateCustomerDto: UpdateCustomerDto): string;
    remove(id: string): Promise<boolean>;
}
