import { CanActivate, ExecutionContext } from '@nestjs/common';
import { BlacklistedTokenService } from '../../token/services/blacklisted-token.service';
export declare class BlacklistGuard implements CanActivate {
    private readonly blacklistedTokenService;
    constructor(blacklistedTokenService: BlacklistedTokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
