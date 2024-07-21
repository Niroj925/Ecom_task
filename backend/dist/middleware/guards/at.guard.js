"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtGuard = void 0;
const passport_1 = require("@nestjs/passport");
class AtGuard extends (0, passport_1.AuthGuard)('jwt-access') {
    constructor() {
        super();
    }
}
exports.AtGuard = AtGuard;
//# sourceMappingURL=at.guard.js.map