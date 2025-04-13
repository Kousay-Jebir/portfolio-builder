import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,private readonly userService : UserService
      ) {}

    async login (user : any){
        const payload = { username: user.username, id: user.id,email:user.email , role : user.role};
        return {
          status: 'success',
          message: 'Logged in successfully',
          access_token: this.jwtService.sign(payload),
          data: payload,
        };
    }
    async validateOrCreateGoogleUser(profile: {
      googleId: string;
      email: string;
      name: string;
    }) {
      let user = await this.userService.findByGoogleId(profile.googleId);
      if (!user) {
        user = await this.userService.createUserFromGoogle(profile);
      }
      return user;
    }

}
