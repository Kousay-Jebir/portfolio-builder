import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionDocument } from './entities/subscription.entity';
import { Model } from 'mongoose';
import { BaseService } from '../services/base.service';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { BlacklistedTokenService } from '../token/services/blacklisted-token.service';
export declare class SubscriptionService extends BaseService<SubscriptionDocument> {
    private subscriptionModel;
    private readonly authService;
    private readonly userService;
    private readonly blacklistedTokenService;
    constructor(subscriptionModel: Model<SubscriptionDocument>, authService: AuthService, userService: UserService, blacklistedTokenService: BlacklistedTokenService);
    proceedPaiement(price: number): Promise<any>;
    createSubscription(createSubscriptionDto: CreateSubscriptionDto, user: string): Promise<SubscriptionDocument>;
    verifyPaiemenet(id: string): Promise<any>;
    updateRole(userId: string, token: string): Promise<{
        status: string;
        message: string;
        access_token: string;
        data: {
            username: any;
            id: any;
            email: any;
            role: any;
        };
    }>;
}
