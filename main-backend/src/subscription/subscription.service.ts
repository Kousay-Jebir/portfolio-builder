import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PRICE_MAP } from './maps/price.map';
import { EXPIRATION_MAP } from './maps/expiration.map';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription, SubscriptionDocument } from './entities/subscription.entity';
import { Model } from 'mongoose';
import { BaseService } from 'src/services/base.service';
import axios from 'axios';

@Injectable()
export class SubscriptionService extends BaseService<SubscriptionDocument> {
    constructor(@InjectModel(Subscription.name) private subscriptionModel : Model<SubscriptionDocument>){
            super(subscriptionModel)
        }

    async proceedPaiement(amount:number){
        console.log(process.env.FLOUCI_APP_TOKEN)
        const payload={
            "app_token": `${process.env.FLOUCI_APP_TOKEN}`,
            "app_secret": `${process.env.FLOUCI_APP_SECRET}`,
            
            "amount":"5000",
            "accept_card":"true",
            
            "session_timeout_secs": amount,
            "success_link": "https://example.website.com/success",
            "fail_link": "https://example.website.com/fail",
            "developer_tracking_id": "608f16e0-61dd-4ac1-b16b-f485f03afb16"
          }
        const url = `${process.env.FLOUCI_URL}`
    
        const res = await axios.post(url,payload);
        console.log(res.data)
       return res.data


    }

    async createSubscription(createSubscriptionDto : CreateSubscriptionDto,user : any):Promise<SubscriptionDocument>{
        const {title,type}=createSubscriptionDto
        const price = PRICE_MAP[type]
        const days = EXPIRATION_MAP[type]
        if (!price || !days) throw new Error('Invalid subscription type');

        const deleteAt = new Date();
        deleteAt.setDate(deleteAt.getDate() + days);
        return await (await this.create({title:title,type:type,price:price,deleteAt:deleteAt,userId:user.id})).toObject()
        
    }
}
