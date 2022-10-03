import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class PostSupplierDto {
    @IsString()
    @IsNotEmpty({ message: 'Podaj nazwę dostawcy' })
    name: string;

    @IsNumber()
    @Min(1, { message: 'Podaj cene dostawy' })
    price: number;
}
