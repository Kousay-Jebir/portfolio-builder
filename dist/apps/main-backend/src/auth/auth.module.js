"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const config_1 = require("@nestjs/config");
const auth_controller_1 = require("./auth.controller");
const user_module_1 = require("../user/user.module");
const google_strategy_1 = require("./strategy/google.strategy");
const mongoose_1 = require("@nestjs/mongoose");
const blacklisted_token_entity_1 = require("../token/entity/blacklisted-token.entity");
const blacklisted_token_service_1 = require("../token/services/blacklisted-token.service");
const blacklist_guard_1 = require("./guard/blacklist.guard");
const token_module_1 = require("../token/token.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('SECRET') || 'secretKey',
                    signOptions: { expiresIn: '60m' },
                }),
                inject: [config_1.ConfigService],
            }), mongoose_1.MongooseModule.forFeature([{ name: blacklisted_token_entity_1.BlacklistedToken.name, schema: blacklisted_token_entity_1.BlacklistedTokenSchema }]), user_module_1.UserModule, token_module_1.TokenModule
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, google_strategy_1.GoogleStrategy, blacklisted_token_service_1.BlacklistedTokenService, blacklist_guard_1.BlacklistGuard],
        exports: [auth_service_1.AuthService, blacklisted_token_service_1.BlacklistedTokenService],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map