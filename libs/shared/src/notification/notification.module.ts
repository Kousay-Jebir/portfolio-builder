import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Notification, NotificationSchema } from "./entities/notification.entity";
import { NotificationService } from "./notification.service";


@Module({
  imports: [MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }])],
  providers: [NotificationService],
  controllers: [],
  exports:[NotificationService]
})
export class NotificationModule {}
