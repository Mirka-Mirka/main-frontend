export class LoginModel {
  email: string;
  password: string;

  constructor(params: LoginModel){
    this.email = params.email;
    this.password = params.password;
  }
}
