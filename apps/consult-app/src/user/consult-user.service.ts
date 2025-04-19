import { Injectable } from "@nestjs/common";
import { PortfolioService, User } from "@portfolio-builder/shared";

@Injectable()
export class ConsultUserService {
    constructor(private readonly portfolioService : PortfolioService){}

    async getUsersWithPortfolio() {
        const portfolios = await this.portfolioService.findAllWithUserProfileOnly();
      
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
        return await this.portfolioService.findByCriteria({ user: id });
      }



}