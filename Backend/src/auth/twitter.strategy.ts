import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, IStrategyOptionWithRequest } from 'passport-twitter';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private configService: ConfigService) {
    super({
      consumerKey: configService.get<string>('TWITTER_API_KEY'),
      consumerSecret: configService.get<string>('TWITTER_API_SECRET'),
      callbackURL: configService.get<string>('TWITTER_CALLBACK_URL'),
      passReqToCallback: true,
    } as IStrategyOptionWithRequest);
  }

  async validate(
    req: Request,
    token: string, // This is the oauth_token (Access Token)
    tokenSecret: string, // This is the oauth_token_secret (Access Token Secret)
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { id, username, displayName } = profile;

    // We pass all necessary user and token info to the controller
    const user = {
      twitterId: id,
      username,
      displayName,
      oauthToken: token,
      oauthSecret: tokenSecret,
    };

    done(null, user);
  }
}