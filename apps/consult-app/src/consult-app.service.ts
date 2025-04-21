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
import { Model } from 'mongoose';

@Injectable()
export class ConsultAppService {
  constructor(
    @InjectModel(Portfolio.name)
    private readonly portfolioModel: Model<PortfolioDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly portfolioService: PortfolioService,
    private readonly notificationService: NotificationService,
    private readonly eventService : EventService
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
      await this.notificationService.create({
        message,
        viewer: viewer.id,
        portfolio: id,
        receiver: portfolio.user,
      });
      console.log('viewed')
      this.eventService.notifyUser(receiverId as string, message);
    }
    portfolio.user = receiverId;

    return portfolio;
  }

  async updateNotfiStatus(id: string) {
    return await this.notificationService.update(id, { seen: true });
  }
}
