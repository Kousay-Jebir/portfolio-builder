import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ConnectedUser } from 'src/decorator/user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { SubscriptionType } from 'src/enum/subscription-type.enum';
import { Request, Response } from 'express';
import { PRICE_MAP } from './maps/price.map';
import { QueryDataDto } from './dto/query-data.dto';
import { AuthService } from 'src/auth/auth.service';
import { BlacklistGuard } from 'src/auth/guard/blacklist.guard';

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

    res.cookie('pay_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 60,
      secure: false,
    });
    const paiement = await this.subscriptionService.proceedPaiement(
      createSubscriptionDto,
      user.id,
      price,
    );
    return paiement.result.link;
  }

  // @UseGuards(JwtAuthGuard,BlacklistGuard)
  // @ApiBearerAuth('JWT-auth')
  @Get('success')
  async verifyPaiement(@Query() query: QueryDataDto, @Req() req: Request) {
    const token = req.cookies?.pay_token;

    const res = await this.subscriptionService.verifyPaiemenet(
      query.payment_id,
    );
    const subscription =
      res.result.status == 'SUCCESS'
        ? await this.subscriptionService.createSubscription(
            { title: query.title, type: query.type },
            query.userId,
          )
        : null;
    return this.subscriptionService.updateRole(query.userId, token);
  }
}
