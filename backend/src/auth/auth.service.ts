import { User, UserDocument } from './auth.schema';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { PostUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwt: JwtService,
        private config: ConfigService,
    ) {}

    async register(data: PostUserDto) {
        const hash = await argon.hash(data.password);
        const user = await new this.userModel({ email: data.email, hash });
        await user.save();
        return await this.generetToken(user._id, user.email);
    }

    async login(data: PostUserDto) {
        const user = await this.userModel.findOne({ email: data.email });

        if (!user) throw new ForbiddenException('Credentials incorrect');

        const pwMatches = await argon.verify(user.hash, data.password);

        if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

        return await this.generetToken(user._id, user.email);
    }

    private async generetToken(userId: Schema.Types.ObjectId, email: string) {
        const paylod = {
            sub: userId,
            email,
        };

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(paylod, {
            expiresIn: '1d',
            secret: secret,
        });

        return {
            access_token: token,
        };
    }
}
