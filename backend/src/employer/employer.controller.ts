import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ObjectId } from 'mongodb';
import { EmployerService } from './employer.service';

@UseGuards(AuthGuard('jwt'))
@Controller('employer')
export class EmployerController {
    constructor(private employerService: EmployerService) {}

    @Get()
    async getAll(@Req() req: any) {
        await this.employerService.getAll(
            ObjectId.createFromHexString(req.user.userId),
        );
    }
}
