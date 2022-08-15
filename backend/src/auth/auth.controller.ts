import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() data: UserLoginDto) {
    return data;
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
