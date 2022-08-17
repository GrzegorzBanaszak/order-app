import { IsNotEmpty, IsNumber } from 'class-validator';

export class PostCommodityDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
  description?: string;
}
