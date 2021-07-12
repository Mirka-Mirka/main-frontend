import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {RegistrationModel} from "../../models/registration.model";
import {UserRole} from "../../models/user.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  hide = true;
  addManager = false;
  userTypes: string[] = ['user', 'manager'];

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.form = new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      username: new FormControl(""),
      email: new FormControl(""),
      password: new FormControl(""),
      pib: new FormControl(""),
      city: new FormControl(""),
      street: new FormControl(""),
      country: new FormControl(""),
      latitude: new FormControl(""),
      longitude: new FormControl(""),
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

  private convertFromFormToRegistrationModel() : RegistrationModel {
    const user = this.form.value;
    return new RegistrationModel({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      username: user.username,
      // role: this.addManager ? UserRole.AGENT : UserRole.USER,
      // pib: user.pib,
      // city: user.city,
      // street: user.street,
      // country: user.country,
      // latitude: user.latitude,
      // longitude: user.longitude,
    })
  }

  register() {
    const userRegistrationData = this.convertFromFormToRegistrationModel();
    this.authService.registration(userRegistrationData).subscribe((res) => {
      if (res !== false) {
        this.router.navigate(['/login']);
      } else {
        this.toastr.error('Neuspesno');
      }
    });
  }

  openLoginPage() {
    this.router.navigate([`/login`]);
  }
}
