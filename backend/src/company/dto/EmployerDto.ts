export class EmployerDto {
    constructor(name: string, phoneNumber: string) {
        this.name = name;
        this.phoneNumber = phoneNumber;
    }
    name: string;
    phoneNumber: string;
}
