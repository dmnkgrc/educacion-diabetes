export class User {
    public email: string;
    // tslint:disable:variable-name
    public user_id: number;
    public first_name: string;
    public last_name: string;
    public speciality: string;
    public city: string;
    public address: string;
    public phone: string;
    public cellphone: string;
    public professional_license: string;
    public exp: string;


    constructor( data: any) {
        Object.assign(this, data);
    }
}
