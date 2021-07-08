import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  hide = true;
  addManager = false;
  uspesnoRegistrovan = false;
  userType: string = "";
  userTypes: string[] = ['user', 'manager'];

  constructor() {
    this.form = new FormGroup({
      usernameOrEmail: new FormControl(""),
      password: new FormControl("")
    });
  }

  ngOnInit(): void {
  }

  onSelectUserType(type: string) {
    if (type == this.userTypes[1]) {
      this.addManager = true;
    } else {
      this.addManager = false;
    }


  }

  register(form: FormGroup) {
    console.log(form);
    this.uspesnoRegistrovan = true;

  }

}
