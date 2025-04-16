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
exports.BlacklistedTokenService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const blacklisted_token_entity_1 = require("../entity/blacklisted-token.entity");
const mongoose_2 = require("mongoose");
let BlacklistedTokenService = class BlacklistedTokenService {
    blacklistedTokenModel;
    constructor(blacklistedTokenModel) {
        this.blacklistedTokenModel = blacklistedTokenModel;
    }
    async blacklistToken(token) {
        const created = new this.blacklistedTokenModel({ token: token });
        return created.save();
    }
    async isBlacklisted(token) {
        return this.blacklistedTokenModel.findOne({ token: token }).exec();
    }
};
exports.BlacklistedTokenService = BlacklistedTokenService;
exports.BlacklistedTokenService = BlacklistedTokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blacklisted_token_entity_1.BlacklistedToken.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BlacklistedTokenService);
//# sourceMappingURL=blacklisted-token.service.js.map