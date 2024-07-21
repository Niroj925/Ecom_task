import { AuthService } from './auth.service';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { UpdateCustomerDto } from '../customer/dto/update-customer.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    logIn(createAuthDto: CreateCustomerDto): Promise<{
        access_token: string;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAuthDto: UpdateCustomerDto): string;
    remove(id: string): string;
}
