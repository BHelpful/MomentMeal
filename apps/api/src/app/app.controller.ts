import { Controller, Get, UseGuards } from '@nestjs/common';
// ...
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthGuard } from '../modules/auth/auth.guard';
import { Session } from '../modules/auth/session.decorator';
// ...

@Controller()
export class AppController {
  // ...
  @Get('test')
  @UseGuards(AuthGuard)
  async getTest(@Session() session: SessionContainer): Promise<string> {
    // TODO: magic
    return 'magic';
  }
}
