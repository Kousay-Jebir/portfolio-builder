import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ConnectedUser } from 'src/decorator/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { SubscriptionType } from 'src/enum/subscription-type.enum';
import { Response } from 'express';
import { PRICE_MAP } from './maps/price.map';

@Controller('subscription')
export class SubscriptionController {

    constructor(private readonly subscriptionService : SubscriptionService){}
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Post('addSubscription')
    async subscribe(@Body() createSubscriptionDto : CreateSubscriptionDto,@ConnectedUser() user : any){
        const price = PRICE_MAP[createSubscriptionDto.type]
        
        const paiement= await this.subscriptionService.proceedPaiement(price);
        const subscription =  await this.subscriptionService.createSubscription(createSubscriptionDto,user);
        return 'ok'


        

    }

}
