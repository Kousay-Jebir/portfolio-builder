import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { MessageService } from "./message.service";
import { BlacklistGuard, ConnectedUser, JwtAuthGuard } from "@portfolio-builder/shared";
import { ApiBearerAuth } from "@nestjs/swagger";
import { CreateMessageDto } from "./dto/create-message.dto";

@Controller('message')
export class MessageController{
    constructor(private readonly messageService : MessageService){}
    
    @UseGuards(JwtAuthGuard,BlacklistGuard)
    @ApiBearerAuth('JWT-auth')
    @Post('send')
    async sendMessage(@Body() createMessageDto :CreateMessageDto,@ConnectedUser() user :any ){

        const sender = user.id
        return await this.messageService.create({content:createMessageDto.message,sender:sender,receiver:createMessageDto.receiver,})

    }
}