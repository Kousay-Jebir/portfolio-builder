// blacklist.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { BlacklistedTokenService } from '../token/services/blacklisted-token.service';

@Injectable()
export class BlacklistGuard implements CanActivate {
  constructor(private readonly blacklistedTokenService: BlacklistedTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    const isBlacklisted = await this.blacklistedTokenService.isBlacklisted(token);

    if (isBlacklisted) {
      throw new UnauthorizedException('Token has been blacklisted');
    }

    return true;
  }
}
