import { Body, Controller, Param, Post, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { EventService } from '@portfolio-builder/shared';
@ApiTags('event')
@Controller('event')
export class MainEventController {
  constructor(private readonly eventService: EventService) {}
  @Sse(':id')
  getEvents(
    @Param('id') id: string,
  ): Observable<{ data: any; event?: string }> {
    return this.eventService.connect(id);
  }
  @Post('notify-user')
  notifyUser(@Body() body ) {
    this.eventService.notifyUser(body.userId, body.message,body.event);
  }
}
