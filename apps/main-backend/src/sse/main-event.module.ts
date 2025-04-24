import { Module } from "@nestjs/common";
import { EventModule,  SharedModule, TokenModule } from "@portfolio-builder/shared";
import { MainEventController } from "./main-event.controller";


@Module({
  imports: [SharedModule,TokenModule,EventModule],
  controllers: [MainEventController],
  providers: [],
  exports : []
})
export class MainEventModule {}
