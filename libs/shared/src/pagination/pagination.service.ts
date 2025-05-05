import { Injectable } from "@nestjs/common";
import { QueryWithHelpers } from "mongoose";
import { of } from "rxjs";

@Injectable()
export class PaginationService{
    constructor(){
    }

    paginate<T>(
        query: QueryWithHelpers<T[], T>,
        offset?: number,
        limit?: number,
      ) {
        if (offset) query.skip(offset);
        if (limit) query.limit(limit);
        return query;
      }
      

}