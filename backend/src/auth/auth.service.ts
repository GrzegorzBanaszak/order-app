import { User, UserDocument } from './auth.schema';
import { UserLoginDto } from './../../dist/auth/dto/UserLoginDto.d';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseError } from 'mongoose';

@Injectable({})
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async register(data: UserLoginDto) {
        const hash = await argon.hash(data.password);

        try {
            const user = await new this.userModel({ email: data.email, hash });

            return user.save();
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }
}
