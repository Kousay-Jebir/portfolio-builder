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
    // const portfolio = await this.portfolioService.findById(id)
    // if(!portfolio){
    //   return new NotFoundException('portfolio not found')
    // }
    // const viewer =user
    // const portfolioOwner=(await portfolio.populate('user')).user
    // const message = (portfolioOwner as User).role==UserRole.VIP?`${viewer.username} viewed your profile`:"One user viewed your profile"
    // const recentNotif= await this.notificationService.findByCriteria({viewer:viewer.id,receiver:portfolio.user})
    // if(!recentNotif){
    //   await this.notificationService.create({message:message,viewer:viewer.id,portfolio:id,receiver:portfolio.user})
    //   return portfolio

    // }  
    // const diffInMs = Math.abs(recentNotif.createdAt.getTime() - new Date().getTime());
    // const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    // if(diffInMinutes >60)
    //   {
    //     await this.notificationService.create({message:message,viewer:viewer.id,portfolio:id,receiver:portfolio.user})
    // }
    // return portfolio
    const portfolio = await this.portfolioService.findById(id);
if (!portfolio) {
  throw new NotFoundException('Portfolio not found');
}
const receiverId = portfolio.user

const viewer = user;

// Only populate 'user' once and cast safely
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
  await this.notificationService.create({
    message,
    viewer: viewer.id,
    portfolio: id,
    receiver: portfolio.user,
  });
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
}
