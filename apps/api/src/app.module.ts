import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { CategoriesModule } from './modules/categories/categories.module';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { StoresModule } from './modules/stores/stores.module';
import { PrismaModule } from './services/prisma/prisma.module';

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
	providers: [],
	controllers: [],
})
export class AppModule {}
