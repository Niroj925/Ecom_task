import { customerEntity } from 'src/model/sql/customer.entity';
import { Repository } from 'typeorm';
import { hash } from 'src/helper/utils/hash';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { UpdateCustomerDto } from '../customer/dto/update-customer.dto';
import { Token } from 'src/helper/utils/token';
export declare class AuthService {
    private readonly cutomerRepository;
    private hash;
    private token;
    constructor(cutomerRepository: Repository<customerEntity>, hash: hash, token: Token);
    signIn(createAuthDto: CreateCustomerDto): Promise<{
        access_token: string;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAuthDto: UpdateCustomerDto): string;
    remove(id: number): string;
}
