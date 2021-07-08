import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;
  uspesnoLogovan = false;

  constructor() {
    this.form = new FormGroup({
      usernameOrEmail: new FormControl(""),
      password: new FormControl("")
    });
  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.form);
    this.uspesnoLogovan = true;
    const user= this.convertFromFormToAccommondationModel();
  }

  private convertFromFormToAccommondationModel() : UserModel { 
      const user = this.form.value;
      return new UserModel({email: user.email , password: user.password})
  }

}
