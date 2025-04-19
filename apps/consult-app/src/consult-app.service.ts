import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  NotificationService,
  Portfolio,
  PortfolioDocument,
  PortfolioService,
  User,
  UserDocument,
  UserRole,
} from '@portfolio-builder/shared';
import { Model } from 'mongoose';
import { ConsultEventService } from './sse/consult-event.service';


@Injectable()
export class ConsultAppService {
  constructor(
    @InjectModel(Portfolio.name)
    private readonly portfolioModel: Model<PortfolioDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly portfolioService: PortfolioService,
    private readonly notificationService : NotificationService,
    private readonly consultEvenetService : ConsultEventService
  ) {}
  getHello(): string {
    return 'Hello World From Consult!';
  }

  
  
  

  async getUserPortfolios(id: string) {
    return await this.portfolioService.findByCriteria({ user: id });
  }

  async getPortfolioById(id : string,user : any){
    const portfolio = await this.portfolioService.findById(id);
if (!portfolio) {
  throw new NotFoundException('Portfolio not found');
}
const receiverId = portfolio.user

const viewer = user;

const populatedPortfolio = await portfolio.populate<{ user: User }>('user');
const portfolioOwner = populatedPortfolio.user;

const message = portfolioOwner.role === UserRole.VIP
  ? `${viewer.username} viewed your profile`
  : 'One user viewed your profile';

const recentNotif = await this.notificationService.findByCriteria({
  viewer: viewer.id,
  receiver: receiverId,
});

const shouldCreateNotification =
  !recentNotif ||
  (new Date().getTime() - new Date(recentNotif.createdAt).getTime()) > 60 * 60 * 1000;

if (shouldCreateNotification) {
  if(recentNotif){await this.notificationService.delete(recentNotif.id)}
  await this.notificationService.create({
    message,
    viewer: viewer.id,
    portfolio: id,
    receiver: portfolio.user,
  });
  this.consultEvenetService.notifyUser(receiverId as string,message)
}

return portfolio;

    







  }
 

  async updateNotfiStatus(id:string){
    return await this.notificationService.update(id,{seen:true})
  }







  
























}
