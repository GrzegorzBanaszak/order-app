import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { PostUserDto } from 'src/user/dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() data: PostUserDto) {
        return this.authService.login(data);
    }

    @Post('register')
    async register(@Body() data: PostUserDto) {
        return this.authService.register(data);
    }
}
