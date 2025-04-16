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
exports.BuilderAppController = void 0;
const common_1 = require("@nestjs/common");
const builder_app_service_1 = require("./builder-app.service");
let BuilderAppController = class BuilderAppController {
    builderAppService;
    constructor(builderAppService) {
        this.builderAppService = builderAppService;
    }
    getHello() {
        return this.builderAppService.getHello();
    }
};
exports.BuilderAppController = BuilderAppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], BuilderAppController.prototype, "getHello", null);
exports.BuilderAppController = BuilderAppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [builder_app_service_1.BuilderAppService])
], BuilderAppController);
//# sourceMappingURL=builder-app.controller.js.map