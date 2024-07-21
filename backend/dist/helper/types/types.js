"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleType = exports.packageStatus = void 0;
var packageStatus;
(function (packageStatus) {
    packageStatus["pending"] = "pending";
    packageStatus["shipped"] = "shipped";
    packageStatus["delivered"] = "delivered";
    packageStatus["returned"] = "returned";
    packageStatus["cancelled"] = "cancelled";
})(packageStatus || (exports.packageStatus = packageStatus = {}));
var roleType;
(function (roleType) {
    roleType["customer"] = "customer";
    roleType["curior"] = "currior";
    roleType["owner"] = "owner";
})(roleType || (exports.roleType = roleType = {}));
//# sourceMappingURL=types.js.map