import {
  Body,
  Controller,
  Get,
  NotAcceptableException,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ConnectedUser } from '@portfolio-builder/shared';
import { JwtAuthGuard } from '@portfolio-builder/shared';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { SubscriptionType } from '@portfolio-builder/shared';
import { Request, Response } from 'express';
import { PRICE_MAP } from './maps/price.map';
import { QueryDataDto } from './dto/query-data.dto';
import { AuthService } from '../auth/auth.service';
import { BlacklistGuard } from '@portfolio-builder/shared';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('addSubscription')
  async subscribe(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @ConnectedUser() user: any,
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const price = PRICE_MAP[createSubscriptionDto.type];
    const token = req.headers.authorization?.split(' ')[1];

    
    const paiement = await this.subscriptionService.proceedPaiement(price);
    res.cookie('pay_token', {token:token,title:createSubscriptionDto.title,type:createSubscriptionDto.type,userId:user.id}, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      secure: false,
    });
    return paiement.result.link;
  }

  // @UseGuards(JwtAuthGuard,BlacklistGuard)
  // @ApiBearerAuth('JWT-auth')
  @Get('success')
  async verifyPaiement(@Req() req: Request,@Query('payment_id') payment_id : string) {

    const res = await this.subscriptionService.verifyPaiemenet(
      payment_id
    );
    const payload = req.cookies?.pay_token;


    if(!res || !payload){
      throw new NotAcceptableException('Payment failed')
    }
    await this.subscriptionService.createSubscription(
      { title: payload.title, type: payload.type },
      payload.userId,
    )
    return this.subscriptionService.updateRole(payload.userId, payload.token);

  }
}
