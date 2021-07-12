export class LoginModel {
  usernameOrEmail: string;
  password: string;

  constructor(params: LoginModel){
    this.usernameOrEmail = params.usernameOrEmail;
    this.password = params.password;
  }
}
