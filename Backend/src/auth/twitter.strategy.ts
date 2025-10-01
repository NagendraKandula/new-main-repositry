import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-twitter";
import { ConfigService } from "@nestjs/config"; 
@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private configService: ConfigService) {
    super({
      consumerKey: configService.get<string>('TWITTER_API_KEY')!,
      consumerSecret: configService.get<string>('TWITTER_API_KEY_SECRET')!,
        callbackURL: configService.get<string>('TWITTER_CALLBACK_URL')!,
        includeEmail: true,
    });
  }
    async validate(token: string, tokenSecret: string, profile: Profile,done:(err:any,user:any)=>void): Promise<any> {
    
        const { displayName, photos, emails } = profile;
        const user = {
            email:emails ? emails[0].value : null,
            fullname: displayName,
            picture: photos ? photos[0].value : null,
            accessToken: token,
            accessTokenSecret: tokenSecret,
        };
        done(null, user);
    }
}