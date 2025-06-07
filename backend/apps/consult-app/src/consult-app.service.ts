import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  EventService,
  NotificationService,
  Portfolio,
  PortfolioDocument,
  PortfolioService,
  User,
  UserDocument,
  UserRole,
} from '@portfolio-builder/shared';
import axios from 'axios';
import { Model } from 'mongoose';
import { ActivitylogService } from './activitylog/activitylog.service';
import { ActivityTypeEnum } from './activitylog/enum/activity-type.enum';

@Injectable()
export class ConsultAppService {
  constructor(
    @InjectModel(Portfolio.name)
    private readonly portfolioModel: Model<PortfolioDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly portfolioService: PortfolioService,
    private readonly notificationService: NotificationService,
    private readonly eventService : EventService,
    private readonly activityLogService : ActivitylogService
  ) {}
  getHello(): string {
    return 'Hello World From Consult!';
  }

  async getUserPortfolios(id: string){
    return await this.portfolioService.findByCriteria({ user: id });
  }

  async getPortfolioById(id: string, user: any): Promise<Portfolio> {
    console.log('in')
    const portfolio = await this.portfolioService.findById(id);
    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }
    const receiverId = portfolio.user;

    const viewer = user;

    const populatedPortfolio = await portfolio.populate<{ user: User }>({
      path: 'user',
      select: 'id role',
    });

    const portfolioOwner = populatedPortfolio.user;

    const message =
      portfolioOwner.role === UserRole.VIP
        ? `${viewer.username} viewed your profile`
        : 'One user viewed your profile';

    const recentNotif = await this.notificationService.findByCriteria({
      viewer: viewer.id,
      receiver: receiverId,
    });
    console.log('recent notif',recentNotif)

    const shouldCreateNotification =
      !recentNotif ||
      new Date().getTime() - new Date(recentNotif.createdAt).getTime() >
        60 * 60 * 1000;
     console.log(shouldCreateNotification)
    if (shouldCreateNotification) {
      if (recentNotif) {
        await this.notificationService.delete(recentNotif.id);
      }
      if (receiverId!=viewer.id)await this.notificationService.create({
        message,
        viewer: viewer.id,
        portfolio: id,
        receiver: portfolio.user,
      });
      console.log('viewed')

      if(receiverId!=viewer.id)axios.post(`http://localhost:5000/main/event/notify-user`, {
                  userId: receiverId as string,
                  message: message,
                  eventType:'portfolio_view'
                })
      if(receiverId!=viewer.id)await this.activityLogService.logActivity(viewer.id,ActivityTypeEnum.VIEW,{
        portfolio:id,ownerId:receiverId
      })
      // this.eventService.notifyUser(receiverId as string, message,'portfolio_view');

    }

    portfolio.user = receiverId;

    return portfolio;
  }

  async updateNotfiStatus(id: string) {
    return await this.notificationService.update(id, { seen: true });
  }

  async likePortfolio(id:string,userId:string){
    const portfolio = await this.portfolioService.findById(id)
    if(!portfolio){
      throw new NotFoundException('portfolio not found')
    }
    return await this.activityLogService.logActivity(userId,ActivityTypeEnum.LIKE,{
      portfolio:id,
      ownerId:portfolio.user
    })

  }
}
