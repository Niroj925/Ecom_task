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
exports.PackageController = void 0;
const common_1 = require("@nestjs/common");
const package_service_1 = require("./package.service");
const create_package_dto_1 = require("./dto/create-package.dto");
const update_package_dto_1 = require("./dto/update-package.dto");
const swagger_1 = require("@nestjs/swagger");
let PackageController = class PackageController {
    constructor(packageService) {
        this.packageService = packageService;
    }
    create(customerId, createPackageDto) {
        return this.packageService.create(createPackageDto, customerId);
    }
    findAll(query) {
        const { package_status } = query;
        return this.packageService.findAll(package_status);
    }
    findOne(id) {
        return this.packageService.findOne(id);
    }
    update(id, updatePackageDto) {
        return this.packageService.update(+id, updatePackageDto);
    }
    remove(id) {
        return this.packageService.remove(id);
    }
};
exports.PackageController = PackageController;
__decorate([
    (0, common_1.Post)(":customerId"),
    (0, swagger_1.ApiOperation)({ summary: 'Create a package' }),
    (0, swagger_1.ApiBody)({ type: create_package_dto_1.CreatePackageDto }),
    __param(0, (0, common_1.Param)('customerId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_package_dto_1.CreatePackageDto]),
    __metadata("design:returntype", void 0)
], PackageController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'package_status' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PackageController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PackageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_package_dto_1.UpdatePackageDto]),
    __metadata("design:returntype", void 0)
], PackageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PackageController.prototype, "remove", null);
exports.PackageController = PackageController = __decorate([
    (0, common_1.Controller)('package'),
    (0, swagger_1.ApiTags)('Package'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Created Successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unathorised request' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server Error' }),
    __metadata("design:paramtypes", [package_service_1.PackageService])
], PackageController);
//# sourceMappingURL=package.controller.js.map