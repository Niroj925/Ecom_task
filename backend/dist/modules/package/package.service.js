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
exports.PackageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const package_entity_1 = require("../../model/sql/package.entity");
const typeorm_2 = require("typeorm");
const item_entity_1 = require("../../model/sql/item.entity");
const types_1 = require("../../helper/types/types");
let PackageService = class PackageService {
    constructor(packageRepository, itemRepository) {
        this.packageRepository = packageRepository;
        this.itemRepository = itemRepository;
    }
    async create(createPackageDto, id) {
        let totalCost = 0;
        let weight = 0;
        const items = createPackageDto.items.map(async (id) => {
            const item = await this.itemRepository.findOne({ where: { id } });
            totalCost += +item.price;
            weight += +item.weight;
            if (totalCost <= 250) {
                return item;
            }
            else {
                throw new common_1.ForbiddenException("total amount should be less than $250.");
            }
        });
        const itemsAll = await Promise.all(items);
        const newPackage = this.packageRepository.create({
            weight,
            price: totalCost,
            courierPrice: courierPrice(weight),
            status: types_1.packageStatus.pending,
            items: itemsAll,
            customer: { id }
        });
        await this.packageRepository.save(newPackage);
        return true;
    }
    async findAll(package_status) {
        const packages = await this.packageRepository.find({
            where: { status: package_status },
            relations: ['customer', 'items'],
            select: {
                id: true,
                price: true,
                courierPrice: true,
                weight: true,
                status: true,
                customer: { email: true },
                items: {
                    id: true,
                    name: true
                }
            }
        });
        return packages;
    }
    async findOne(id) {
        const my_package = await this.packageRepository.findOne({
            where: { id },
            relations: ['items', 'customer'],
            select: {
                items: true,
                customerEmail: true
            }
        });
        return my_package;
    }
    update(id, updatePackageDto) {
        return `This action updates a #${id} package`;
    }
    async remove(id) {
        const my_package = await this.packageRepository.findOne({ where: { id } });
        if (my_package.status == types_1.packageStatus.pending) {
            await this.packageRepository.remove(my_package);
            return true;
        }
        else {
            return {
                success: false,
                msg: "not possible delete package you can return",
            };
        }
    }
};
exports.PackageService = PackageService;
exports.PackageService = PackageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(package_entity_1.packageEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(item_entity_1.itemEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PackageService);
const courierPrice = (weight) => {
    let price;
    if (weight < 200) {
        price = 5;
    }
    else if (weight < 500) {
        price = 10;
    }
    else if (weight < 1000) {
        price = 15;
    }
    else if (weight < 5000) {
        price = 20;
    }
    else {
        price = 25;
    }
    return price;
};
//# sourceMappingURL=package.service.js.map