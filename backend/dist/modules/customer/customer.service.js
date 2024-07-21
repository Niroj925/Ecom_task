"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("../../model/sql/customer.entity");
const typeorm_2 = require("typeorm");
const hash_1 = require("../../helper/utils/hash");
let CustomerService = class CustomerService {
    constructor(customerRepository, hash) {
        this.customerRepository = customerRepository;
        this.hash = hash;
    }
    async create(createCustomerDto) {
        const { email, password } = createCustomerDto;
        const existingCustomer = await this.customerRepository.findOne({
            where: { email },
        });
        if (existingCustomer) {
            return { id: existingCustomer.id };
        }
        else {
            const customer = this.customerRepository.create({
                email,
                password: password && (await this.hash.value(createCustomerDto.password)),
            });
            const newCustomer = await this.customerRepository.save(customer);
            return { id: newCustomer.id };
        }
    }
    async findAll() {
        return await this.customerRepository.find({ select: ["id", "email"] });
    }
    findOne(id) {
        return `This action returns a #${id} customer`;
    }
    update(id, updateCustomerDto) {
        return `This action updates a #${id} customer`;
    }
    async remove(id) {
        await this.customerRepository.delete({ id });
        return true;
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.customerEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hash_1.hash])
], CustomerService);
//# sourceMappingURL=customer.service.js.map