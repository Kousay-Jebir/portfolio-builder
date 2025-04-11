
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from "dotenv"

import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'

dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET')||'',
    });
  }

  async validate(payload: any) {
   
    return payload.role=='user'?{  username: payload.username , id:payload.id,email:payload.email,role:'user'}:{identifiant:payload.identifiant,role:'admin'}
  }
}