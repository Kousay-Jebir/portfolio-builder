"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const blacklisted_token_entity_1 = require("./entity/blacklisted-token.entity");
const blacklisted_token_service_1 = require("./services/blacklisted-token.service");
const blacklist_guard_1 = require("../auth/guard/blacklist.guard");
let TokenModule = class TokenModule {
};
exports.TokenModule = TokenModule;
exports.TokenModule = TokenModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: blacklisted_token_entity_1.BlacklistedToken.name, schema: blacklisted_token_entity_1.BlacklistedTokenSchema }])
        ],
        providers: [blacklisted_token_service_1.BlacklistedTokenService, blacklist_guard_1.BlacklistGuard],
        exports: [blacklisted_token_service_1.BlacklistedTokenService],
        controllers: [],
    })
], TokenModule);
//# sourceMappingURL=token.module.js.map