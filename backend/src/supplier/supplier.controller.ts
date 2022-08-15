import { SupplierService } from './supplier.service';
import { Controller, Post } from '@nestjs/common';

@Controller('supplier')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}

  @Post()
  async add() {
    return await this.supplierService.add();
  }
}
