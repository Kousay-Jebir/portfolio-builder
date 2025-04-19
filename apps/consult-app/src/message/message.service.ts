import { Injectable} from "@nestjs/common";
import { BaseService } from "@portfolio-builder/shared";
import { Message, MessageDocument } from "./entities/message.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class MessageService extends BaseService<MessageDocument>{
    constructor(
        @InjectModel(Message.name)
        private messageModel: Model<MessageDocument>,
        
      ){super(messageModel);}

    

}