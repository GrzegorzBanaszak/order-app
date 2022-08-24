import { Supplier } from './supplier.schema';
import { MapInterceptor } from '@automapper/nestjs';
import { PostSupplierDto } from './dto/PostSupplierDto';
import { SupplierService } from './supplier.service';
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
import { GetSupplierDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('supplier')
export class SupplierController {
    constructor(private supplierService: SupplierService) {}

    @Get()
    @UseInterceptors(
        MapInterceptor(Supplier, GetSupplierDto, { isArray: true }),
    )
    async getAll() {
        return await this.supplierService.getAll();
    }

    @Post('add')
    @UseInterceptors(MapInterceptor(Supplier, GetSupplierDto))
    async add(@Body() data: PostSupplierDto) {
        return await this.supplierService.add(data);
    }

    @Put('update/:id')
    @UseInterceptors(MapInterceptor(Supplier, GetSupplierDto))
    async update(@Param() params: any, @Body() data: PostSupplierDto) {
        return await this.supplierService.update(params.id, data);
    }

    @Delete('delete/:id')
    async delete(@Param() params: any) {
        return await this.supplierService.delete(params.id);
    }
}
