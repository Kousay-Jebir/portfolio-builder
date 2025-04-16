import { ConsultAppService } from './consult-app.service';
export declare class ConsultAppController {
    private readonly consultAppService;
    constructor(consultAppService: ConsultAppService);
    getHello(): string;
}
