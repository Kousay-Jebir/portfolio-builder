import { Module } from "@nestjs/common";
import { SharedModule } from "../shared.module";
import { TokenModule } from "../token/token.module";
import { EventService } from "./event.service";


@Module({
  imports: [SharedModule,TokenModule],
  controllers: [],
  providers: [EventService],
  exports : [EventService]
})
export class EventModule {}
