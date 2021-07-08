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
  addManager = true;
  uspesnoRegistrovan = false;
  constructor() {
    this.form = new FormGroup({
      usernameOrEmail : new FormControl(""),
      password : new FormControl("")
    });
   }

  ngOnInit(): void {
  }

  register(form: FormGroup) {
    console.log(form);
     this.uspesnoRegistrovan = true;
  
    }

}
