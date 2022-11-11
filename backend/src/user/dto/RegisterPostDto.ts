import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterPostDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}
