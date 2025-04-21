import { Module } from "@nestjs/common";
import { EventModule,  SharedModule, TokenModule } from "@portfolio-builder/shared";
import { ConsultEventController } from "./consult-event.controller";


@Module({
  imports: [SharedModule,TokenModule,EventModule],
  controllers: [ConsultEventController],
  providers: [],
  exports : []
})
export class ConsultEventModule {}
