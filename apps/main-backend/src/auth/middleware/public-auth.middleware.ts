import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthPublicMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        throw new UnauthorizedException('unauthorized')
    }
    const payload = this.jwtService.verify(token)

    if (!payload) {
        throw new UnauthorizedException('unauthorized')
    }

    (req as any).user = payload;

    next();
  }
}
