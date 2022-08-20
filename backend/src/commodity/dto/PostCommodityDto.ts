import { IsNotEmpty } from 'class-validator';

export class PostCommodityDto {
    @IsNotEmpty()
    name: string;

    description?: string;
}
