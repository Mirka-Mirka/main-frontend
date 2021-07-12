export enum UserRole {
  USER = 'USER',
  AGENT = 'AGENT'
}

export class UserModel {
    public id?: number;
    public email?: string;
    public role: UserRole;
    public username: string;


    constructor(params: UserModel){
        this.id = params.id;
        this.role = params.role;
        this.email = params.email;
        this.username = params.username;
    }
}
