import { Module } from "@nestjs/common";
import { CvModule, PaginationService, PortfolioModule, SharedModule, TokenModule } from "@portfolio-builder/shared";
import { ConsultUserService } from "./consult-user.service";
import { ConsultUserController } from "./consult-user.controller";
import { ActivitylogModule } from "../activitylog/activitylog.module";


@Module({
  imports: [PortfolioModule,SharedModule,TokenModule,CvModule,ActivitylogModule],
  controllers: [ConsultUserController],
  providers: [ConsultUserService,PaginationService],
  exports : [ConsultUserService]
})
export class ConsultUserModule {}
