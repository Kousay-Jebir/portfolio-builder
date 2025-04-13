import { Controller, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {

    constructor(private readonly subscriptionService : SubscriptionService){}

    @Post('addSubscription')
    async subscribe(){
        const paiement = await this.subscriptionService.proceedPaiement();
        
    }

}
