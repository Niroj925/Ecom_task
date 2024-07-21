import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, BadRequestException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';
import { ConnectionNotFoundError, EntityNotFoundError, EntityPropertyNotFoundError, QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }
    catch(exception: any, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        console.log("exception:", exception);
        if (exception instanceof QueryFailedError && exception['code']) {
            const errorCode = exception['code'];
            console.log("QueryFailedError with error code: ", errorCode);
            switch (errorCode) {
                case '23502': // Not null violation
                    status = HttpStatus.BAD_REQUEST;
                    message = 'Not null constraint violation';
                    break;
                case '23503': // Foreign key violation
                    status = HttpStatus.BAD_REQUEST;
                    message = 'Foreign key constraint violation';
                    break;
                case '23505': // Unique constraint violation
                    status = HttpStatus.CONFLICT;
                    message = 'Unique constraint violation';
                    break;
                case '22001': // String length exceeds limit
                    status = HttpStatus.BAD_REQUEST;
                    message = 'String length exceeds limit';
                    break;
                case '22P02': // Invalid input syntax for integer
                    status = HttpStatus.BAD_REQUEST;
                    message = 'Invalid input syntax for integer';
                    break;
                // Add more cases for other specific error codes as needed
                default:
                    status = HttpStatus.INTERNAL_SERVER_ERROR;
                    message = 'Database error';
                    break;
            }
        }
        else if (exception instanceof EntityNotFoundError) {
            status = HttpStatus.NOT_FOUND;
            message = "Couldn't find and data.";
        }
        else if (exception instanceof ConnectionNotFoundError) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Database connection not found';
        }
        else if (exception instanceof BadRequestException) {
            status = HttpStatus.BAD_REQUEST;
            message = exception.getResponse()['message'];
        }
        else if (exception instanceof EntityPropertyNotFoundError) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = exception.message;
        }
        else if (exception instanceof TypeError) {
            status = HttpStatus.BAD_REQUEST;
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
}
