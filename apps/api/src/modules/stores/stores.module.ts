import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';

@Module({
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
