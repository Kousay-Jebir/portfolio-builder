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
exports.BlacklistedTokenSchema = exports.BlacklistedToken = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let BlacklistedToken = class BlacklistedToken {
    token;
    createdAt;
};
exports.BlacklistedToken = BlacklistedToken;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BlacklistedToken.prototype, "token", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now, index: { expires: '1h' } }),
    __metadata("design:type", Date)
], BlacklistedToken.prototype, "createdAt", void 0);
exports.BlacklistedToken = BlacklistedToken = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], BlacklistedToken);
exports.BlacklistedTokenSchema = mongoose_1.SchemaFactory.createForClass(BlacklistedToken);
//# sourceMappingURL=blacklisted-token.entity.js.map