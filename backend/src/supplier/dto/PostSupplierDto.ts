import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostSupplierDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}
