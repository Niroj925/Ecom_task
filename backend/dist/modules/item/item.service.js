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
exports.ItemService = void 0;
const common_1 = require("@nestjs/common");
const item_entity_1 = require("../../model/sql/item.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let ItemService = class ItemService {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async create(createItemDto) {
        const item = this.itemRepository.create({ ...createItemDto });
        await this.itemRepository.save(item);
        return true;
    }
    async findAll() {
        return await this.itemRepository.find();
    }
    async findOne(id) {
        return await this.itemRepository.findOne({ where: { id } });
    }
    async update(id, updateItemDto) {
        const item = await this.itemRepository.findOne({ where: { id } });
        const updatedItem = Object.assign(item, updateItemDto);
        await this.itemRepository.save(updatedItem);
        return true;
    }
    async remove(id) {
        await this.itemRepository.delete({ id });
        return true;
    }
};
exports.ItemService = ItemService;
exports.ItemService = ItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(item_entity_1.itemEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ItemService);
//# sourceMappingURL=item.service.js.map