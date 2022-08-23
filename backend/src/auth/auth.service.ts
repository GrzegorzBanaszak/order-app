import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';
import { PostUserDto } from 'src/user/dto';
import { Schema } from 'mongoose';
@Injectable({})
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) {}

    async login(data: PostUserDto) {
        const user = await this.userService.findUser(data.email);

        if (!user) throw new ForbiddenException('Credentials incorrect');

        const pwMatches = await argon.verify(user.hash, data.password);

        if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

        const payload = { email: user.email, id: user._id };
        const token = await this.generetToken(user._id, user.email);

        return {
            accese_token: token,
            user: payload,
        };
    }

    async register(data: PostUserDto) {
        const argonHash = await argon.hash(data.password);
        const user = await this.userService.createUser(data.email, argonHash);

        if (!user) {
            throw new ForbiddenException('Credentials incorrect');
        }
        const payload = { email: user.email, id: user._id };
        const token = await this.generetToken(user._id, user.email);

        return {
            accese_token: token,
            user: payload,
        };
    }

    private async generetToken(userId: Schema.Types.ObjectId, email: string) {
        const paylod = {
            sub: userId,
            email,
        };

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwtService.signAsync(paylod, {
            expiresIn: '1d',
            secret: secret,
        });

        return token;
    }
}
