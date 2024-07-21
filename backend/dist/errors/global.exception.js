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
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("typeorm");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        console.log("exception:", exception);
        if (exception instanceof typeorm_1.QueryFailedError && exception['code']) {
            const errorCode = exception['code'];
            console.log("QueryFailedError with error code: ", errorCode);
            switch (errorCode) {
                case '23502':
                    status = common_1.HttpStatus.BAD_REQUEST;
                    message = 'Not null constraint violation';
                    break;
                case '23503':
                    status = common_1.HttpStatus.BAD_REQUEST;
                    message = 'Foreign key constraint violation';
                    break;
                case '23505':
                    status = common_1.HttpStatus.CONFLICT;
                    message = 'Unique constraint violation';
                    break;
                case '22001':
                    status = common_1.HttpStatus.BAD_REQUEST;
                    message = 'String length exceeds limit';
                    break;
                case '22P02':
                    status = common_1.HttpStatus.BAD_REQUEST;
                    message = 'Invalid input syntax for integer';
                    break;
                default:
                    status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
                    message = 'Database error';
                    break;
            }
        }
        else if (exception instanceof typeorm_1.EntityNotFoundError) {
            status = common_1.HttpStatus.NOT_FOUND;
            message = "Couldn't find and data.";
        }
        else if (exception instanceof typeorm_1.ConnectionNotFoundError) {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Database connection not found';
        }
        else if (exception instanceof common_1.BadRequestException) {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = exception.getResponse()['message'];
        }
        else if (exception instanceof typeorm_1.EntityPropertyNotFoundError) {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message = exception.message;
        }
        else if (exception instanceof TypeError) {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = exception.message;
        }
        else if (exception.response && exception.response.statusCode) {
            status = exception.response.statusCode;
            message = exception.response.message || 'Unhandled exception';
        }
        response.status(status).json({
            statusCode: status,
            message: message,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        });
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], GlobalExceptionFilter);
//# sourceMappingURL=global.exception.js.map