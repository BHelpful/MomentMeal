import { Controller, Request, Response, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    try {
      const accessToken = this.authService.login(req.user);
      return res.status(200).json(accessToken);
    } catch (err) {
      return res.status(403);
    }
  }
}
