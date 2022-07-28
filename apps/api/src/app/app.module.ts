import { StoresModule } from '../modules/stores/stores.module';
import { IngredientsModule } from '../modules/ingredients/ingredients.module';
import { CategoriesModule } from '../modules/categories/categories.module';
import { RecipesModule } from '../modules/recipes/recipes.module';
import { UsersModule } from '../modules/users/users.module';
import { AuthModule } from '../modules/auth/auth.module';
import { Module } from '@nestjs/common';

import { PrismaModule } from '../services/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule.forRoot({
      // These are the connection details of the app you created on supertokens.com
      connectionURI: 'http://localhost:3567',
      apiKey: 'someKey', // OR can be undefined
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/thirdparty/appinfo
        appName: 'meal-time',
        apiDomain: 'http://localhost:3333',
        websiteDomain: 'http://localhost:4200',
        apiBasePath: '/api',
        websiteBasePath: '/auth',
      },
    }),
    UsersModule,
    RecipesModule,
    CategoriesModule,
    IngredientsModule,
    StoresModule,
    PrismaModule,
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
