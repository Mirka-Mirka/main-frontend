import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { AccommodationModel } from '../models/accommodation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  private createHttpOptions(token: string): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  public getAccommodationTypes() {
    return this.http.get<any>(`${baseURL}/types`).pipe(
      tap(() => {}),
      catchError((error) => {
        this.toastr.error(error.message, 'Error!');

        return of(false);
      })
    );
  }

  public getAccommodations(userId: number | undefined) {
    return this.http
      .get<any>(`${baseURL}/properties` + (userId ? `/${userId}/manager` : ''))
      .pipe(
        tap(() => {}),
        catchError((error) => {
          this.toastr.error(error.message, 'Error!');

          return of(false);
        })
      );
  }

  public getAccommodation(id: string) {
    return this.http.get<any>(`${baseURL}/properties/${id}`).pipe(
      tap(() => {}),
      catchError((error) => {
        this.toastr.error(error.message, 'Error!');

        return of(false);
      })
    );
  }

  public postAccommodation(accommodation: AccommodationModel): Observable<any> {
    return this.http.post<any>(`${baseURL}/properties`, accommodation).pipe(
      tap(() => {}),
      catchError((error) => {
        this.toastr.error(error.message, 'Error!');

        return of(false);
      })
    );
  }

  public deleteAccommodation(Id: string) {
    const getToken = localStorage.getItem('token');
    let token = null;
    if (getToken) {
      token = JSON.parse(getToken);
    }
    const httpOptions = this.createHttpOptions(token.value);
    return this.http
      .delete<any>(`${baseURL}/properties/${Id}`, httpOptions)
      .pipe(
        tap(() => {}),
        catchError((error) => {
          this.toastr.error(error.message, 'Error!');

          return of(false);
        })
      );
  }

  public editAccommodation(Id: string, accommodation: AccommodationModel) {
    return this.http
      .post<any>(`${baseURL}//properties/${Id}`, accommodation)
      .pipe(
        tap(() => {}),
        catchError((error) => {
          this.toastr.error(error.message, 'Error!');

          return of(false);
        })
      );
  }

  public postImages(accommodation: AccommodationModel): Observable<any> {
    console.log("****");
    return this.http.post<any>(`${baseURL}/properties`, accommodation).pipe(
      tap(() => { }),
      catchError((error) => {
        this.toastr.error(error.message, 'Error!');

        return of(false);
      })
    );
  }
}
