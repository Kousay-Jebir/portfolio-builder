import { Module } from "@nestjs/common";
import { PortfolioModule, SharedModule, TokenModule } from "@portfolio-builder/shared";
import { ConsultEventController } from "./consult-event.controller";
import { ConsultEventService } from "./consult-event.service";


@Module({
  imports: [SharedModule,TokenModule],
  controllers: [ConsultEventController],
  providers: [ConsultEventService],
  exports : [ConsultEventService]
})
export class ConsultEventModule {}
