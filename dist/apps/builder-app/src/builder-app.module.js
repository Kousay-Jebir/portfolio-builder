"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuilderAppModule = void 0;
const common_1 = require("@nestjs/common");
const builder_app_controller_1 = require("./builder-app.controller");
const builder_app_service_1 = require("./builder-app.service");
let BuilderAppModule = class BuilderAppModule {
};
exports.BuilderAppModule = BuilderAppModule;
exports.BuilderAppModule = BuilderAppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [builder_app_controller_1.BuilderAppController],
        providers: [builder_app_service_1.BuilderAppService],
    })
], BuilderAppModule);
//# sourceMappingURL=builder-app.module.js.map