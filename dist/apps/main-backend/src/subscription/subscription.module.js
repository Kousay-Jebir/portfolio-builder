"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionModule = void 0;
const common_1 = require("@nestjs/common");
const subscription_service_1 = require("./subscription.service");
const subscription_controller_1 = require("./subscription.controller");
const mongoose_1 = require("@nestjs/mongoose");
const subscription_entity_1 = require("./entities/subscription.entity");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../user/user.module");
const token_module_1 = require("../token/token.module");
let SubscriptionModule = class SubscriptionModule {
};
exports.SubscriptionModule = SubscriptionModule;
exports.SubscriptionModule = SubscriptionModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: subscription_entity_1.Subscription.name, schema: subscription_entity_1.SubscriptionSchema }]), auth_module_1.AuthModule, user_module_1.UserModule, token_module_1.TokenModule],
        providers: [subscription_service_1.SubscriptionService],
        controllers: [subscription_controller_1.SubscriptionController]
    })
], SubscriptionModule);
//# sourceMappingURL=subscription.module.js.map