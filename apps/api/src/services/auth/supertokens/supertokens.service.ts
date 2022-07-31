import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword';
import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        ThirdPartyEmailPassword.init({
          providers: [
            ThirdPartyEmailPassword.Google({
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            }),
            ThirdPartyEmailPassword.Github({
              clientId: process.env.GITHUB_CLIENT_ID,
              clientSecret: process.env.GITHUB_CLIENT_SECRET,
            }),
            ThirdPartyEmailPassword.Apple({
              clientId: process.env.APPLE_CLIENT_ID,
              clientSecret: {
                keyId: process.env.APPLE_CLIENT_SECRET_KEY_ID,
                privateKey: process.env.APPLE_CLIENT_SECRET_PRIVATE_KEY,
                teamId: process.env.APPLE_CLIENT_SECRET_TEAM_ID,
              },
            }),
            ThirdPartyEmailPassword.Facebook({
              clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
              clientId: process.env.FACEBOOK_CLIENT_ID,
            }),
          ],
        }),
        Session.init(),
      ],
    });
  }
}
