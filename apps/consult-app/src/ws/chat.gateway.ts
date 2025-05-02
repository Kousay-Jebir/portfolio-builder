import { NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WsResponse,
  ConnectedSocket,
} from '@nestjs/websockets';
import { JwtAuthGuard } from '@portfolio-builder/shared';
import { Server, Socket } from 'socket.io';
import { WsService } from './chat.service';
import { MessageService } from '../message/message.service';
import { Client } from 'socket.io/dist/client';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  private clients = new Map<string, Socket>();
  constructor(
    private readonly jwtService: JwtService,
    private readonly wsService: WsService,
    private readonly messageService: MessageService,
  ) {}

  handleConnection(client: Socket) {
    // return this.wsService.verifyClient(client)
    try {
      const payload = this.wsService.verifyClient(client);
      if (!payload) {
        throw new UnauthorizedException('unauthorized');
      }
      const userId = payload.id as string;
      if (userId) {
        this.clients.set(userId, client);
        console.log(`client with ID ${userId} connected`);
      } else {
        console.log('failed');
        client.disconnect();
      }
    } catch (err) {
      console.log(err);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = Array.from(this.clients.entries()).find(
      ([_, socket]) => socket === client,
    )?.[0];
    if (userId) {
      this.clients.delete(userId);
      console.log(`Client disconnected: ${client.id}`);
    }
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { to: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    try{
      let key: string | undefined;

      for (const [userId, socket] of this.clients.entries()) {
        if (socket.id === client.id) {
          key = userId;
          break;
        }
      }
      if(!key){
        throw new NotFoundException()
      }
  
      const recepientSocket = this.clients.get(data.to);
  
      if (recepientSocket) {
        recepientSocket.emit('message', data.message);
        this.messageService.create({
          content: data.message,
          sender: key,
          receiver: data.to,
        });
      } else {
        console.log('user disconnected');
      }
    }
    catch(err){
      console.log(err)
      
    }
  
   
}
}