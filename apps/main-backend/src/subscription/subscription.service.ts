import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PRICE_MAP } from './maps/price.map';
import { EXPIRATION_MAP } from './maps/expiration.map';
import { InjectModel } from '@nestjs/mongoose';
import {
  Subscription,
  SubscriptionDocument,
} from './entities/subscription.entity';
import { Model } from 'mongoose';
import { BaseService, EventService, MailService, NotificationService } from '@portfolio-builder/shared';
import axios from 'axios';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { UserRole } from '@portfolio-builder/shared';
import { User } from '@portfolio-builder/shared';
import { BlacklistedTokenService } from '@portfolio-builder/shared';
import { access } from 'fs';

@Injectable()
export class SubscriptionService extends BaseService<SubscriptionDocument> implements OnModuleInit{
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly blacklistedTokenService: BlacklistedTokenService,
    private readonly eventService : EventService,
    private readonly notificationService : NotificationService,
    private readonly mailService : MailService
  ) {
    super(subscriptionModel);
  }
  onModuleInit() {
      console.log('init')
      const changeStream = this.subscriptionModel.watch([{$match : {operationType : 'delete'}}],{ fullDocumentBeforeChange: 'required' })
      changeStream.on('change',async (change)=>{
        const deletedDoc = change.fullDocumentBeforeChange;
        if(deletedDoc){
          const deletedId = change.documentKey._id
          // console.log(`sub ${deletedId} deleted`)
          const user = await this.userService.findById(deletedDoc.userId);
          
          if(!user){
            throw new NotFoundException('user not found')
          }
          const newUser = await this.userService.updateRole(deletedDoc.userId,UserRole.User)
          await this.notificationService.create({message: 'Your subscription has been expired',receiver:newUser.id})
          await axios.post(`http://localhost:5000/main/event/notify-user`, {
            userId: deletedDoc.userId,
            message: 'Your subscription has been expired',
            eventType:'sub_expiration'
          })
          await this.mailService.sendMail(user.email,'Subscription','Your subscription has been expired')

  
        }

       

      })
  }

  async proceedPaiement(
    price: number,
  ) {
    const payload = {
      app_token: `${process.env.FLOUCI_APP_TOKEN}`,
      app_secret: `${process.env.FLOUCI_APP_SECRET}`,

      amount: `${price * 1000}`,
      accept_card: 'true',

      session_timeout_secs: 5000,
      success_link: `${process.env.BACKEND}/main/subscription/success`,
      fail_link: 'https://example.website.com/fail',
      developer_tracking_id: '608f16e0-61dd-4ac1-b16b-f485f03afb16',
    };
    const url = `${process.env.FLOUCI_URL}`;

    const res = await axios.post(url, payload);
    return res.data;
  }

  async createSubscription(
    createSubscriptionDto: CreateSubscriptionDto,
    user: string,
  ): Promise<SubscriptionDocument> {
    const { title, type } = createSubscriptionDto;
    const price = PRICE_MAP[type];
    const days = EXPIRATION_MAP[type];
    if (!price || !days) throw new Error('Invalid subscription type');

    const deleteAt = new Date();
    deleteAt.setDate(deleteAt.getDate() + days);
    return await (
      await this.create({
        title: title,
        type: type,
        price: price,
        deleteAt: deleteAt,
        userId: user,
      })
    ).toObject();
  }
  async verifyPaiemenet(id: string) {
    const url = `${process.env.PAYMENT_URL}/${id}`;

    const res = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        apppublic: `${process.env.FLOUCI_APP_TOKEN}`,
        appsecret: `${process.env.FLOUCI_APP_SECRET}`,
      },
    }).then((res)=> {return res.data.result.status === 'SUCCESS';}).catch((err)=>{return false})
    return res
  }
  async updateToken(userId: string, token: string,role:string) {
    const newUser = await this.userService.updateRole(userId,role)
    await this.blacklistedTokenService.blacklistToken(token);
    const newLoggedUser = await this.authService.login(newUser);
    return {access_token : newLoggedUser.access_token}

  }
}
