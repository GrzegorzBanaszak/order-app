import { CommodityService } from './commodity.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { GetCommodityDto, PostCommodityDto } from './dto';
import { MapInterceptor } from '@automapper/nestjs';
import { Commodity } from './commodity.schema';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
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

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.commodityService.getById(id);
    }

    @Post('add')
    @UseInterceptors(MapInterceptor(Commodity, GetCommodityDto))
    async add(@Body() data: PostCommodityDto) {
        return await this.commodityService.add(data);
    }

    @Put('update/:id')
    @UseInterceptors(MapInterceptor(Commodity, GetCommodityDto))
    async update(@Param() params: any, @Body() data: PostCommodityDto) {
        return await this.commodityService.update(params.id, data);
    }

    @Delete('delete/:id')
    async delete(@Param() params: any) {
        return await this.commodityService.delete(params.id);
    }
}
