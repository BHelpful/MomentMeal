import { Module } from '@nestjs/common';
import { PrismaModule } from '../../services/prisma/prisma.module';

import { UsersService } from './users.service';

@Module({
	providers: [UsersService],
	exports: [UsersService],
	imports: [PrismaModule],
})
export class UsersModule {}
