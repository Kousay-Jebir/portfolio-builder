import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
      ) {}

    async login (user : any){
        const payload = { username: user.username, id: user.id,email:user.email };
        return {
          status: 'success',
          message: 'Logged in successfully',
          access_token: this.jwtService.sign(payload,),
          data: payload,
        };
    }
}
