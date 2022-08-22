import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';

export class PostCompanyDto {
    @AutoMap()
    @IsNotEmpty()
    name: string;

    @AutoMap()
    @IsNotEmpty()
    nip: string;
}
