import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";

@Injectable()
export class AggregationService<T>{
    constructor(private readonly model: Model<T>) {}



  async executeAggregation(pipeline: any[]) {
    return this.model.aggregate(pipeline).exec();
  }

}