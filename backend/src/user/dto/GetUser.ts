import { AutoMap } from '@automapper/classes';

export class GetUser {
    @AutoMap()
    email: string;

    @AutoMap()
    username: string;
}
