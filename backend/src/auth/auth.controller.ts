import { MongoExeptionFilter } from './mongo-exeption.filter';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { PostUserDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @UseFilters(MongoExeptionFilter)
    async register(@Body() data: PostUserDto) {
        return await this.authService.register(data);
    }

    // @Post('login')
    // async login(@Body() data: PostUserDto) {
    //     return await this.authService.login(data);
    // }
}
