import { Body, Controller, Param, Post, Sse, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { ConnectedUser, EventService, JwtAuthGuard } from '@portfolio-builder/shared';
import { use } from 'react';
@ApiTags('event')
@Controller('event')

export class MainEventController {
  constructor(private readonly eventService: EventService) {}
  @UseGuards(JwtAuthGuard)
  @Sse()
  getEvents(
    @ConnectedUser() user : any,
  ): Observable<{ data: any; event?: string }> {
    return this.eventService.connect(user.id);
  }
  @Post('notify-user')
  notifyUser(@Body() body ) {
    this.eventService.notifyUser(body.userId, body.message,body.event);
  }
}
