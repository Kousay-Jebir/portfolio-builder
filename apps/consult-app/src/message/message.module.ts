import { Module } from "@nestjs/common";
import { PortfolioModule, SharedModule, TokenModule } from "@portfolio-builder/shared";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "./entities/message.entity";


@Module({
  imports: [MongooseModule.forFeature([
        { name: Message.name, schema: MessageSchema },
      ]),PortfolioModule,SharedModule,TokenModule],
  controllers: [MessageController],
  providers: [MessageService],
  exports : [MessageService]
})
export class MessageModule {}
