import { Injectable } from "@nestjs/common";

@Injectable()
export class AggregationService{



  async executeAggregation(model:any,pipeline: any[]) {
    return await model.aggregate(pipeline).exec();
  }
  async buildAggregation(
  options: {
    matchCriteria?: Record<string, any>;
    groupField?: string; // Make this optional
    sortOptions?: Record<string, 1 | -1>;
    limit?: number;
    skip?: number;
    additionalPipelineStages?: any[]; // For custom stages
  } = {},model:any
) {
  const {
    matchCriteria,
    groupField,
    sortOptions = { count: -1 },
    limit,
    skip,
    additionalPipelineStages = []
  } = options;

  const pipeline: any[] = [];

  // Add $match if criteria provided
  if (matchCriteria) {
    pipeline.push({ $match: matchCriteria });
  }

  // Add $group if groupField provided
  if (groupField) {
    pipeline.push({ 
      $group: { 
        _id: `$${groupField}`, 
        count: { $sum: 1 },
        // Preserve the first document for reference if needed
        document: { $first: '$$ROOT' }
      } 
    });
  }

  // Add additional pipeline stages if any
  pipeline.push(...additionalPipelineStages);

  // Add sorting if groupField was used (implies we have count field)
  if (groupField && sortOptions) {
    pipeline.push({ $sort: sortOptions });
  }

  // Add skip if provided
  if (skip) {
    pipeline.push({ $skip: skip });
  }

  // Add limit if provided
  if (limit) {
    pipeline.push({ $limit: limit });
  }

  // Project only if we grouped
  if (groupField) {
    pipeline.push({ 
      $project: { 
        _id: 0, 
        [groupField.split('.').pop() || 'field']: '$_id', 
        count: 1,
        // Include additional fields from the first document if needed
        ...(groupField ? { document: 1 } : {})
      } 
    });
  }

  return this.executeAggregation(model,pipeline);
}

}