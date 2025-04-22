import { Module } from "@nestjs/common";
import { CvModule, PortfolioModule, SharedModule, TokenModule } from "@portfolio-builder/shared";
import { ConsultUserService } from "./consult-user.service";
import { ConsultUserController } from "./consult-user.controller";


@Module({
  imports: [PortfolioModule,SharedModule,TokenModule,CvModule],
  controllers: [ConsultUserController],
  providers: [ConsultUserService],
  exports : [ConsultUserService]
})
export class ConsultUserModule {}
