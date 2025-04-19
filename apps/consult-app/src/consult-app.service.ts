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
import { Observable, Subscriber } from 'rxjs';
interface ConnectedClient {
  userId: string;
  subscriber: Subscriber<{ data: any; event?: string }>;
}

@Injectable()
export class ConsultAppService {
  constructor(
    @InjectModel(Portfolio.name)
    private readonly portfolioModel: Model<PortfolioDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly portfolioService: PortfolioService,
    private readonly notificationService : NotificationService
  ) {}
  getHello(): string {
    return 'Hello World From Consult!';
  }

  async getUsersWithPortfolio() {
    const portfolios = await this.findAllWithUserProfileOnly();
  
    const profiles = portfolios
      .map((p) => {
        if (typeof p.user === 'object' && 'profile' in p.user && p.user.profile.visibility=='public') {
          return (p.user as User).profile;
        }
        return null;
      })
      .filter((profile) => profile !== null);
  
    return profiles;
  }
  
  

  async getUserPortfolios(id: string) {
    return await this.portfolioModel.find({ user: id });
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
  this.notifyUser(receiverId as string,message)
}

return portfolio;

    







  }
  async findAllWithUserProfileOnly() {
    return this.portfolioModel
      .find()
      .populate({
        path: 'user',
        populate: {
          path: 'profile',
          model: 'UserProfile',
        },
      })
      .exec();
  }







  private clients: ConnectedClient[] = [];

  connect(userId: string): Observable<{ data: any; event?: string }> {
    return new Observable((subscriber) => {
      const client: ConnectedClient = { userId,subscriber };
      this.clients.push(client);

      subscriber.add(() => {
        this.clients = this.clients.filter(c => c !== client);
      });
    });
  }

  notifyUser(userId: string, message: string) {
    for (const client of this.clients) {
      if (client.userId === userId ) {
        client.subscriber.next({
          event: 'portfolio-view',
          data: { message },
        });
      }
    }
  }
























}
