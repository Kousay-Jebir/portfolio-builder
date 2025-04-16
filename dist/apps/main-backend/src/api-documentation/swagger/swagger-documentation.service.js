"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerDocumentationService = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let SwaggerDocumentationService = class SwaggerDocumentationService {
    setup(app) {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Portfolio builder')
            .setDescription('Web API documentation for portfolio-builder app')
            .setVersion('1.0')
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
        }, 'JWT-auth')
            .addCookieAuth('pay_token', {
            type: 'apiKey',
            in: 'cookie',
            name: 'pay_token',
        })
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api/docs', app, document, {
            swaggerOptions: {
                withCredentials: true,
            },
        });
    }
};
exports.SwaggerDocumentationService = SwaggerDocumentationService;
exports.SwaggerDocumentationService = SwaggerDocumentationService = __decorate([
    (0, common_1.Injectable)()
], SwaggerDocumentationService);
//# sourceMappingURL=swagger-documentation.service.js.map