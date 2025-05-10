import { Injectable } from "@nestjs/common";

@Injectable()
export class AggregationService{



  async executeAggregation(model:any,pipeline: any[]) {
    return await model.aggregate(pipeline).exec();
  }

}