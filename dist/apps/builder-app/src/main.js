"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const builder_app_module_1 = require("./builder-app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(builder_app_module_1.BuilderAppModule);
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map