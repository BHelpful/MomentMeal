import { RecipesModule } from './../recipes/recipes.module';
import { UsersModule } from './../users/users.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, UsersModule, RecipesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
