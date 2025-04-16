import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Request, Response } from 'express';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    subscribe(createSubscriptionDto: CreateSubscriptionDto, user: any, req: any, res: Response): Promise<any>;
    verifyPaiement(req: Request, payment_id: string): Promise<{
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
