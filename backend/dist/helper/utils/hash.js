"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
let hash = class hash {
    async value(value) {
        try {
            return await argon.hash(value);
        }
        catch (error) {
            throw error;
        }
    }
    async verifyHashing(originalData, newData) {
        return await argon.verify(originalData, newData);
    }
};
exports.hash = hash;
exports.hash = hash = __decorate([
    (0, common_1.Injectable)()
], hash);
//# sourceMappingURL=hash.js.map