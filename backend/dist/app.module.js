"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const db_config_1 = require("./config/db.config");
const at_strategies_1 = require("./middleware/strategies/at.strategies");
const item_module_1 = require("./modules/item/item.module");
const package_module_1 = require("./modules/package/package.module");
const auth_module_1 = require("./modules/auth/auth.module");
const customer_module_1 = require("./modules/customer/customer.module");
const jwt_1 = require("@nestjs/jwt");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({}),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot(db_config_1.default),
            auth_module_1.AuthModule,
            item_module_1.ItemModule,
            package_module_1.PackageModule,
            customer_module_1.CustomerModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, at_strategies_1.AtStrategy],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map