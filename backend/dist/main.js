"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const global_exception_1 = require("./errors/global.exception");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, {
            rawBody: true,
        });
        const httpAdapterHost = app.get(core_1.HttpAdapterHost);
        app.useBodyParser('text');
        app.useBodyParser('json', { limit: '20mb' });
        app.enableCors();
        app.setGlobalPrefix('api/v1');
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Ecom')
            .setDescription('API Documentation for ecommerce place order')
            .setVersion('1.0')
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'access-token',
            description: 'Enter access-token',
            in: 'header'
        }, 'access-token')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document);
        app.useGlobalFilters(new global_exception_1.GlobalExceptionFilter(httpAdapterHost));
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
        }));
        await app.listen(process.env.PORT || 4000);
        console.log("server is running ");
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
bootstrap();
//# sourceMappingURL=main.js.map