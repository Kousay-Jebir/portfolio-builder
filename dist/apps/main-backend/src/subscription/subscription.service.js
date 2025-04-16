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
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const price_map_1 = require("./maps/price.map");
const expiration_map_1 = require("./maps/expiration.map");
const mongoose_1 = require("@nestjs/mongoose");
const subscription_entity_1 = require("./entities/subscription.entity");
const mongoose_2 = require("mongoose");
const base_service_1 = require("../services/base.service");
const axios_1 = require("axios");
const auth_service_1 = require("../auth/auth.service");
const user_service_1 = require("../user/user.service");
const user_role_enum_1 = require("../enum/user-role.enum");
const blacklisted_token_service_1 = require("../token/services/blacklisted-token.service");
let SubscriptionService = class SubscriptionService extends base_service_1.BaseService {
    subscriptionModel;
    authService;
    userService;
    blacklistedTokenService;
    constructor(subscriptionModel, authService, userService, blacklistedTokenService) {
        super(subscriptionModel);
        this.subscriptionModel = subscriptionModel;
        this.authService = authService;
        this.userService = userService;
        this.blacklistedTokenService = blacklistedTokenService;
    }
    async proceedPaiement(price) {
        console.log(process.env.FLOUCI_APP_TOKEN);
        const payload = {
            app_token: `${process.env.FLOUCI_APP_TOKEN}`,
            app_secret: `${process.env.FLOUCI_APP_SECRET}`,
            amount: `${price * 1000}`,
            accept_card: 'true',
            session_timeout_secs: 5000,
            success_link: `${process.env.BACKEND}/subscription/success`,
            fail_link: 'https://example.website.com/fail',
            developer_tracking_id: '608f16e0-61dd-4ac1-b16b-f485f03afb16',
        };
        const url = `${process.env.FLOUCI_URL}`;
        const res = await axios_1.default.post(url, payload);
        return res.data;
    }
    async createSubscription(createSubscriptionDto, user) {
        const { title, type } = createSubscriptionDto;
        const price = price_map_1.PRICE_MAP[type];
        const days = expiration_map_1.EXPIRATION_MAP[type];
        if (!price || !days)
            throw new Error('Invalid subscription type');
        const deleteAt = new Date();
        deleteAt.setDate(deleteAt.getDate() + days);
        return await (await this.create({
            title: title,
            type: type,
            price: price,
            deleteAt: deleteAt,
            userId: user,
        })).toObject();
    }
    async verifyPaiemenet(id) {
        const url = `${process.env.PAYMENT_URL}/${id}`;
        const res = await axios_1.default.get(url, {
            headers: {
                'Content-Type': 'application/json',
                apppublic: `${process.env.FLOUCI_APP_TOKEN}`,
                appsecret: `${process.env.FLOUCI_APP_SECRET}`,
            },
        });
        return res.data;
    }
    async updateRole(userId, token) {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        user.role = user_role_enum_1.UserRole.VIP;
        const newUser = await user.save();
        await this.blacklistedTokenService.blacklistToken(token);
        return this.authService.login(newUser);
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subscription_entity_1.Subscription.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_service_1.AuthService,
        user_service_1.UserService,
        blacklisted_token_service_1.BlacklistedTokenService])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map