import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "../services/base.service";
import { NotificationDocument ,Notification} from "./entities/notification.entity";


@Injectable()
export class NotificationService extends BaseService<NotificationDocument> {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    
  ){super(notificationModel);}

  async findByCriteria(criteria:Partial<Notification>){
    return await this.notificationModel.findOne(criteria)
  }
  
}
