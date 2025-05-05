import { Injectable } from '@nestjs/common';
import { CvService, PortfolioService, User } from '@portfolio-builder/shared';
import { PaginationDto } from 'libs/shared/src/pagination/dto/pagination.dto';

@Injectable()
export class ConsultUserService {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly cvService: CvService,
  ) {}

  async getUsersWithPortfolio(pagination:PaginationDto) {
    const portfolios = await this.portfolioService.findAllWithUserProfileOnly(pagination);
    

    const profiles = portfolios
      .map((p) => {
        if (
          typeof p.user === 'object' &&
          'profile' in p.user &&
          p.user.profile.visibility == 'public'
        ) {
          return (p.user as User).profile;
        }
        return null;
      })
      .filter((profile) => profile !== null);
    const data = await Promise.all(
      profiles.map(async (item) => {
        const cv = await this.cvService.findByOwnerId(item.user);
        const plainItem = item.toObject();
        return cv ? { ...plainItem, cv: cv.path } : { ...plainItem };
      }),
    );

    return data;
  }

  async getUserPortfolios(id: string) {
    return await this.portfolioService.findByCriteria({ user: id });
  }
}
