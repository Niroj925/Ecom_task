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
exports.itemEntity = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const package_entity_1 = require("./package.entity");
let itemEntity = class itemEntity extends _1.parentEntity {
};
exports.itemEntity = itemEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], itemEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], itemEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], itemEntity.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => package_entity_1.packageEntity, (pkg) => pkg.items),
    __metadata("design:type", Array)
], itemEntity.prototype, "package", void 0);
exports.itemEntity = itemEntity = __decorate([
    (0, typeorm_1.Entity)('item')
], itemEntity);
//# sourceMappingURL=item.entity.js.map