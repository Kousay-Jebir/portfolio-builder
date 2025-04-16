"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDocumentationModule = void 0;
const common_1 = require("@nestjs/common");
const swagger_documentation_service_1 = require("./swagger/swagger-documentation.service");
let ApiDocumentationModule = class ApiDocumentationModule {
};
exports.ApiDocumentationModule = ApiDocumentationModule;
exports.ApiDocumentationModule = ApiDocumentationModule = __decorate([
    (0, common_1.Module)({
        providers: [swagger_documentation_service_1.SwaggerDocumentationService],
        exports: [swagger_documentation_service_1.SwaggerDocumentationService]
    })
], ApiDocumentationModule);
//# sourceMappingURL=api-documentation.module.js.map