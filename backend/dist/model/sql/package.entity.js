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
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageEntity = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const item_entity_1 = require("./item.entity");
const customer_entity_1 = require("./customer.entity");
const types_1 = require("../../helper/types/types");
const class_validator_1 = require("class-validator");
let packageEntity = class packageEntity extends _1.parentEntity {
};
exports.packageEntity = packageEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], packageEntity.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], packageEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], packageEntity.prototype, "courierPrice", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], packageEntity.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], packageEntity.prototype, "customerEmail", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => item_entity_1.itemEntity, (item) => item.package, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinTable)({ name: 'packageItemId' }),
    __metadata("design:type", Array)
], packageEntity.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.customerEntity, (customer) => customer.package),
    __metadata("design:type", customer_entity_1.customerEntity)
], packageEntity.prototype, "customer", void 0);
exports.packageEntity = packageEntity = __decorate([
    (0, typeorm_1.Entity)('package')
], packageEntity);
//# sourceMappingURL=package.entity.js.map