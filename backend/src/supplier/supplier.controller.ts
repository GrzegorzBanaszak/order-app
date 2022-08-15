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
} from '@nestjs/common';

@Controller('supplier')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}

  @Get()
  async getAll() {
    return await this.supplierService.getAll();
  }

  @Post('add')
  async add(@Body() data: PostSupplierDto) {
    return await this.supplierService.add(data);
  }

  @Put('update/:id')
  async update(@Param() params: any, @Body() data: PostSupplierDto) {
    return await this.supplierService.update(params.id, data);
  }

  @Delete('delete/:id')
  async delete(@Param() params: any) {
    return await this.supplierService.delete(params.id);
  }
}
