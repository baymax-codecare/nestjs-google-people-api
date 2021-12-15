import { UserService } from './../user/user.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.APP_DOMAIN}/connect/redirect`,
      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/contacts.readonly  ',
      ],
    });
  }

  // TODO: Should use refresh token to regenerate access_token
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails } = profile;
    const email = emails[0].value;
    const existedUser = await this.userService.userRepo.findOne({
      where: { email },
      select: ['id', 'email', 'fname', 'lname'],
    });

    if (existedUser) {
      return done(null, instanceToPlain(existedUser));
    }
    const user = {
      email: emails[0].value,
      fname: name.givenName,
      lname: name.familyName,
      accessToken,
      isNew: true,
    };
    done(null, user);
  }
}
