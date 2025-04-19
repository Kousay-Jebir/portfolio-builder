import { Controller, Param, Sse } from "@nestjs/common";
import { Observable } from "rxjs";
import { ConsultEventService } from "./consult-event.service";
import { ApiTags } from "@nestjs/swagger";
@ApiTags('event')
@Controller('event')
export class ConsultEventController{
    constructor(private readonly consultEvenetService : ConsultEventService){}
     @Sse(':id')
      getEvents(@Param('id') id :string): Observable<{ data: any; event?: string }> {
        return this.consultEvenetService.connect(id);
      }
}