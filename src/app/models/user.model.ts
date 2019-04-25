export class User {
    public id: number;
    public email: string;

    constructor( data: any) {
        Object.assign(this, data);
    }
}
