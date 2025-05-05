import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Portfolio, PortfolioSchema } from "./entity/portfolio.entity";
import { PortfolioService } from "./portfolio.service";
import { PaginationService } from "../pagination/pagination.service";


@Module({
  imports: [MongooseModule.forFeature([{ name: Portfolio.name, schema: PortfolioSchema }])],
  providers: [PortfolioService,PaginationService],
  controllers: [],
  exports:[PortfolioService]
})
export class PortfolioModule {}
