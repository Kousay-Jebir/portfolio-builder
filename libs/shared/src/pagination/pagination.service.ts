import { Injectable } from "@nestjs/common";
import { of } from "rxjs";

@Injectable()
export class PaginationService{
    constructor(){
    }

    async paginate(query:any,offset:number,limit:number){

        
        const newQuery=query.skip(offset||0)
        return limit? newQuery.limit(limit) : newQuery


    }

}