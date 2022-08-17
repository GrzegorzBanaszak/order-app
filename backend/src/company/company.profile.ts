import { GetCompanyDto } from './dto/GetCompanyDto';
import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Company } from './company.schema';

@Injectable()
export class CompanyProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, Company, GetCompanyDto);
        };
    }
}
