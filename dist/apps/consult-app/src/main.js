"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const consult_app_module_1 = require("./consult-app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(consult_app_module_1.ConsultAppModule);
    await app.listen(3002);
}
bootstrap();
//# sourceMappingURL=main.js.map