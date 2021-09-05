import { Component, DoCheck, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {UserModel, UserRole} from '../../models/user.model';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, DoCheck {
  token: string | null = null;
  user: UserModel | null = null;
  navigationEnd = '';

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
    }
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log(event);
        this.navigationEnd = event.urlAfterRedirects;
      });
  }

  ngDoCheck() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
    }

    const token = localStorage.getItem('token');
    if (token) {
      this.token = JSON.parse(token);
    }
  }

  openHomePage() {
    this.router.navigate([`/home`]);
  }

  openLoginPage() {
    this.router.navigate([`/login`]);
  }

  viewReservations(){
    this.router.navigate([`/accommodation/view-reservations`]);
  }

  openRegistrationPage() {
    this.router.navigate([`/registration`]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
    this.token = null;
  }

  openUserPage() {
    if (this.user && this.user.role === UserRole.AGENT) {
      this.router.navigate(['/accommodation']);
    }
  }

  isAgent() {
    return this.user && this.user.role === UserRole.AGENT;
  }
}
