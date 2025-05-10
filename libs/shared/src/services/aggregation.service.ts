import { Injectable } from "@nestjs/common";

@Injectable()
export class AggregationService{



  async executeAggregation(model:any,pipeline: any[]) {
    return await model.aggregate(pipeline).exec();
  }
  async buildAggregation(
    model:any,
    matchCriteria: Record<string, any>,
    groupField: string,
    sortOptions: Record<string, 1 | -1> = { count: -1 },
    limit?: number
  ) {
    const pipeline: any[] = [
      { $match: matchCriteria },
      { $group: { _id: `$${groupField}`, count: { $sum: 1 } } },
      { $sort: sortOptions },
      { $project: { _id: 0, [groupField]: '$_id', count: 1 } }
    ];

    if (limit) {
      pipeline.push({ $limit: limit });
    }

    return this.executeAggregation(model,pipeline);
  }

}