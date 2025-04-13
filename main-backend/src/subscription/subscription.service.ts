import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PRICE_MAP } from './maps/price.map';
import { EXPIRATION_MAP } from './maps/expiration.map';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription, SubscriptionDocument } from './entities/subscription.entity';
import { Model } from 'mongoose';
import { BaseService } from 'src/services/base.service';

@Injectable()
export class SubscriptionService extends BaseService<SubscriptionDocument> {
    constructor(@InjectModel(Subscription.name) private subscriptionModel : Model<SubscriptionDocument>){
            super(subscriptionModel)
        }

    async proceedPaiement(){


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
