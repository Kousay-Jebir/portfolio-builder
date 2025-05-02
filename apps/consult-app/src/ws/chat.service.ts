import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsService {
    constructor(private readonly jwtService: JwtService) {}

    verifyClient(client: Socket){
        const token = client.handshake.query.token as string;
    //     console.log("token",token)
    //     const payload=this.jwtService.verify(token)
    //    console.log("payload",payload) 
        if (!token) throw new UnauthorizedException('Missing token');
      
        try {
          const payload = this.jwtService.verify(token);
          if (!payload) {
            throw new UnauthorizedException('Invalid token');
          }
          return payload;
        } catch (e) {
          throw new UnauthorizedException('Invalid token');
        }
      }
      

}