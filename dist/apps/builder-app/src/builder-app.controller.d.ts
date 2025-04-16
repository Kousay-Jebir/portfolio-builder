import { BuilderAppService } from './builder-app.service';
export declare class BuilderAppController {
    private readonly builderAppService;
    constructor(builderAppService: BuilderAppService);
    getHello(): string;
}
