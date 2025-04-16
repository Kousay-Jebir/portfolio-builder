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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const subscription_service_1 = require("./subscription.service");
const create_subscription_dto_1 = require("./dto/create-subscription.dto");
const user_decorator_1 = require("../decorator/user.decorator");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const price_map_1 = require("./maps/price.map");
let SubscriptionController = class SubscriptionController {
    subscriptionService;
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }
    async subscribe(createSubscriptionDto, user, req, res) {
        const price = price_map_1.PRICE_MAP[createSubscriptionDto.type];
        const token = req.headers.authorization?.split(' ')[1];
        res.cookie('pay_token', { token: token, title: createSubscriptionDto.title, type: createSubscriptionDto.type, userId: user.id }, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 60,
            secure: false,
        });
        const paiement = await this.subscriptionService.proceedPaiement(price);
        return paiement.result.link;
    }
    async verifyPaiement(req, payment_id) {
        const payload = req.cookies?.pay_token;
        const res = await this.subscriptionService.verifyPaiemenet(payment_id);
        const subscription = res.result.status == 'SUCCESS'
            ? await this.subscriptionService.createSubscription({ title: payload.title, type: payload.type }, payload.userId)
            : null;
        return this.subscriptionService.updateRole(payload.userId, payload.token);
    }
};
exports.SubscriptionController = SubscriptionController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Post)('addSubscription'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.ConnectedUser)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subscription_dto_1.CreateSubscriptionDto, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "subscribe", null);
__decorate([
    (0, common_1.Get)('success'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('payment_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "verifyPaiement", null);
exports.SubscriptionController = SubscriptionController = __decorate([
    (0, common_1.Controller)('subscription'),
    __metadata("design:paramtypes", [subscription_service_1.SubscriptionService])
], SubscriptionController);
//# sourceMappingURL=subscription.controller.js.map