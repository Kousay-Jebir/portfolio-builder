import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BlacklistedToken, BlacklistedTokenSchema } from "./entity/blacklisted-token.entity";
import { BlacklistedTokenService } from "./services/blacklisted-token.service";
import { BlacklistGuard } from "../auth/jwt-auth.guard/blacklist.guard";

@Module({
  imports: [
    
    MongooseModule.forFeature([{ name: BlacklistedToken.name, schema: BlacklistedTokenSchema }])
   
  ],
  providers: [BlacklistedTokenService,BlacklistGuard],
  exports: [BlacklistedTokenService],
  controllers: [],
})
export class TokenModule {}