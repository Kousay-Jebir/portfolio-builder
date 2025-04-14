import { Body, Controller, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ConnectedUser } from 'src/decorator/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { SubscriptionType } from 'src/enum/subscription-type.enum';
import { Response } from 'express';
import { PRICE_MAP } from './maps/price.map';
import { QueryDataDto } from './dto/query-data.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('subscription')
export class SubscriptionController {

    constructor(private readonly subscriptionService : SubscriptionService,){}
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Post('addSubscription')
    async subscribe(@Body() createSubscriptionDto : CreateSubscriptionDto,@ConnectedUser() user : any){
        const price = PRICE_MAP[createSubscriptionDto.type]
        
        const paiement= await this.subscriptionService.proceedPaiement(createSubscriptionDto,user.id,price);
        return paiement.result.link







        

    }
    

    @Get('success')
    async verifyPaiement(@Query() query : QueryDataDto){
        
        const res= await this.subscriptionService.verifyPaiemenet(query.payment_id)
        const subscription= res.result.status=="SUCCESS"?await this.subscriptionService.createSubscription({title:query.title,type:query.type},query.userId):null
        return this.subscriptionService.updateRole(query.userId) 

    }

}
