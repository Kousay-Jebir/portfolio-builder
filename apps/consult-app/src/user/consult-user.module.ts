import { Module } from "@nestjs/common";
import { PortfolioModule, SharedModule, TokenModule } from "@portfolio-builder/shared";
import { ConsultUserService } from "./consult-user.service";
import { ConsultUserController } from "./consult-user.controller";


@Module({
  imports: [PortfolioModule,SharedModule,TokenModule],
  controllers: [ConsultUserController],
  providers: [ConsultUserService],
  exports : [ConsultUserService]
})
export class ConsultUserModule {}
