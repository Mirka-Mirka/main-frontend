import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = "";
  ulogovaoSe: string = "";
  registrovaoSe: string = "";

  constructor(private router: Router) {
  }

  ngOnInit() {

  }

  openLoginPage() {
    this.ulogovaoSe = "idem na login page";
    this.username = "Mirka";
    this.router.navigate([`/login`]);


    this.isLoggedIn=true;
  }

  openRegistrationPage() {
    this.registrovaoSe = "idem na stranicu za registraciju";
    this.router.navigate([`/registration`]);
  }

  logout(){
    this.username = "nema usera";
  }
}




