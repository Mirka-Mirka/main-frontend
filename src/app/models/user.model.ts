export class UserModel{
    public id?: number;
    public email: string;
    public password: string;

    constructor(params: UserModel){
       this.id = params.id;
       this.email = params.email;
       this.password = params.password;
    }
}