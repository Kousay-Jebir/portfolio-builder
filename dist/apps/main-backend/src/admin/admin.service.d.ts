import { BaseService } from '../services/base.service';
import { Model } from 'mongoose';
import { UserDocument } from '../user/entities/user.entity';
export declare class AdminService extends BaseService<UserDocument> {
    private userModel;
    constructor(userModel: Model<UserDocument>);
}
