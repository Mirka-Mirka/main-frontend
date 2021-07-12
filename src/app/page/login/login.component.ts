import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { LoginModel } from "../../models/login.model";
import { AuthService } from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.form = new FormGroup({
      usernameOrEmail: new FormControl(""),
      password: new FormControl("")
    });
  }

  ngOnInit(): void {
  }

  login() {
    const userLoginData = this.convertFromFormToLoginModel();
    this.authService.login(userLoginData).subscribe((res) => {
      if (res !== false) {
        this.router.navigate(['/home']);
      } else {
        this.toastr.error('Neuspesno');
      }
    });
  }

  openRegistrationPage() {
    this.router.navigate([`/registration`]);
  }

  private convertFromFormToLoginModel() : LoginModel {
      const user = this.form.value;
      return new LoginModel({usernameOrEmail: user.usernameOrEmail , password: user.password})
  }
}
