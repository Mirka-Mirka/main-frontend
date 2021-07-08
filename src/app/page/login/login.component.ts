import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;
  uspesnoLogovan=false;

  constructor() {
    this.form = new FormGroup({
      usernameOrEmail : new FormControl(""),
      password : new FormControl("")
    });
   }

  ngOnInit(): void {
  }

  login(form: FormGroup) {
  console.log(form);
   this.uspesnoLogovan = true;

  }

}
