import { StoresModule } from './modules/stores/stores.module';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';

import { PrismaModule } from './services/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    RecipesModule,
    CategoriesModule,
    IngredientsModule,
    StoresModule,
    PrismaModule,
  ],
})
export class AppModule {}
