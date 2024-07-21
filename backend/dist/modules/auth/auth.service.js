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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("../../model/sql/customer.entity");
const typeorm_2 = require("typeorm");
const hash_1 = require("../../helper/utils/hash");
const token_1 = require("../../helper/utils/token");
let AuthService = class AuthService {
    constructor(cutomerRepository, hash, token) {
        this.cutomerRepository = cutomerRepository;
        this.hash = hash;
        this.token = token;
    }
    async signIn(createAuthDto) {
        const customer = await this.cutomerRepository.findOne({ where: { email: createAuthDto.email } });
        const JwtPayload = {
            sub: customer.id,
            email: customer.email
        };
        return await this.hash.verifyHashing(customer.password, createAuthDto.password) && ({ access_token: await this.token.generateAcessToken(JwtPayload) });
    }
    findAll() {
        return `This action returns all auth`;
    }
    findOne(id) {
        return `This action returns a #${id} auth`;
    }
    update(id, updateAuthDto) {
        return `This action updates a #${id} auth`;
    }
    remove(id) {
        return `This action removes a #${id} auth`;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.customerEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hash_1.hash,
        token_1.Token])
], AuthService);
//# sourceMappingURL=auth.service.js.map