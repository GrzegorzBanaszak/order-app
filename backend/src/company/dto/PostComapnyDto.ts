import { AutoMap } from '@automapper/classes';

export class PostCompanyDto {
    @AutoMap()
    name: string;

    @AutoMap()
    nip: string;
}
