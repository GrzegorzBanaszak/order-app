import { IsNotEmpty, IsString } from 'class-validator';

export class PostCommodityDto {
    @IsNotEmpty()
    name: string;

    @IsString()
    description?: string;
}
