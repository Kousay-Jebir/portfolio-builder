import { Controller, Param, Sse } from "@nestjs/common";
import { Observable } from "rxjs";
import { ApiTags } from "@nestjs/swagger";
import { EventService } from "@portfolio-builder/shared";
@ApiTags('event')
@Controller('event')
export class ConsultEventController{
    constructor(private readonly consultEvenetService : EventService){}
     @Sse(':id')
      getEvents(@Param('id') id :string): Observable<{ data: any; event?: string }> {
        return this.consultEvenetService.connect(id);
      }
}