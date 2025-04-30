import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, SubscribeMessage, MessageBody, WsResponse, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  private clients =  new Map<string,Socket>();
  constructor(private readonly jwtService: JwtService) {}


  handleConnection(client: Socket) {
    const token = client.handshake.auth.token
    if(!token){
      throw new UnauthorizedException('unauthorized')
    }
    const payload=this.jwtService.verify(token)
    if(!payload){
      throw new UnauthorizedException('unauthorized')

    }
    const userId = payload.user.id as string
    if(userId){
        this.clients.set(userId,client)
        console.log(`client with ID ${userId} connected`)
    }
    else{
      console.log('failed')
    client.disconnect()
    }
    
  }

  handleDisconnect(client: Socket) {
    const userId =Array.from(this.clients.entries()).find(([_, socket]) => socket === client)?.[0];
    if(userId){
        this.clients.delete(userId)
        console.log(`Client disconnected: ${client.id}`);
    }
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: { to: string; message: string }){

    const recepientSocket = this.clients.get(data.to)

    if(recepientSocket){
        recepientSocket.emit('message',data.message)

    }
    else{
        console.log('user disconnected')
    }

  }
}
