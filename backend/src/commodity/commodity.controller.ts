import { CommodityService } from './commodity.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { GetCommodityDto, PostCommodityDto } from './dto';
import { MapInterceptor } from '@automapper/nestjs';
import { Commodity } from './commodity.schema';

@Controller('commodity')
export class CommodityController {
  constructor(private commodityService: CommodityService) {}

  @Get()
  @UseInterceptors(
    MapInterceptor(Commodity, GetCommodityDto, { isArray: true }),
  )
  async getAll() {
    return await this.commodityService.getAll();
  }

  @Post('add')
  async add(@Body() data: PostCommodityDto) {
    return await this.commodityService.add(data);
  }

  @Put('update/:id')
  async update(@Param() params: any, @Body() data: PostCommodityDto) {
    return await this.commodityService.update(params.id, data);
  }

  @Delete('delete/:id')
  async delete(@Param() params: any) {
    return await this.commodityService.delete(params.id);
  }
}
