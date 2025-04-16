"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseConfig = void 0;
const mongooseConfig = async (configService) => ({
    uri: configService.get('MONGO_URI'),
});
exports.mongooseConfig = mongooseConfig;
//# sourceMappingURL=mongoose.config.js.map