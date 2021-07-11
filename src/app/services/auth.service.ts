import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Token } from '../models/token.model';
import { baseURL } from 'src/environments/environment';
import { UserModel, UserRole } from '../models/user.model';
import { RegistrationModel } from '../models/registration.model';
import { LoginModel } from "../models/login.model";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentTokenSubject: BehaviorSubject<Token | null>;
  public currentToken: Observable<Token | null>;
  private currentTokenUserInfo: BehaviorSubject<UserModel | null>;
  public currentUser: Observable<UserModel | null>;
  @Output() updateNotifications: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private toastr: ToastrService) {
    const token = null;
    if (localStorage.getItem('token') !== null) {
      localStorage.getItem('token')
    }
    const currentUser = null;
    if (localStorage.getItem('currentUser') !== null) {
      localStorage.getItem('currentUser')
    }
    this.currentTokenSubject = new BehaviorSubject<Token | null>(token);
    this.currentToken = this.currentTokenSubject.asObservable();
    this.currentTokenUserInfo = new BehaviorSubject<UserModel | null>(currentUser);
    this.currentUser = this.currentTokenUserInfo.asObservable();
  }

  public get currentTokenValue(): Token | null {
    return this.currentTokenSubject.value;
  }

  public get currentTokenUserInfoValue(): UserModel | null {
    return this.currentTokenUserInfo.value;
  }

  public hasRole(role: UserRole): boolean {
    if (this.currentUser === null) {
      return false;
    }
    return this.currentTokenUserInfoValue !== null && this.currentTokenUserInfoValue.role === role;
  }

  login(loginData: LoginModel) {
    return this.http.post<any>(`${baseURL}/authenticate`, loginData).pipe(
      tap((data) => {
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('currentUser', JSON.stringify(data.userInfo));
        this.currentTokenSubject.next(data.token);
        this.currentTokenUserInfo.next(data.userInfo);
        this.updateNotifications.emit(true);
      }),
      catchError((error) => {
        this.toastr.error(error, 'Error!');
        return of(false);
      })
    );
  }

  public registration(registrationData: RegistrationModel) {
    return this.http.post<any>(`${baseURL}/companies`, registrationData)
      .pipe(
        tap(() => {}),
        catchError(error => {
          this.toastr.error(error, 'Error!');
          return of(false);
        }));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentTokenSubject.next(null);
    this.currentTokenUserInfo.next(null);
  }
}
