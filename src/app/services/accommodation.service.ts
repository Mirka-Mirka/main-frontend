import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL, MainBackend, RootLocation } from 'src/environments/environment';
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
  private createHttpOptionsForFiles(token: string): any {
    return {
      headers: new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
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
    const getToken = localStorage.getItem('token');
    let token = null;
    if (getToken) {
      token = JSON.parse(getToken);
    }
    const httpOptions = this.createHttpOptions(token.value);
    console.log("****");
    return this.http
      .put<any>(`${baseURL}/properties/${Id}`, accommodation, httpOptions)
      .pipe(
        tap(() => {}),
        catchError((error) => {
          this.toastr.error(error.message, 'Error!');

          return of(false);
        })
      );
  }

  public createAccommodation(accommodation: AccommodationModel): Observable<any> {
    const getToken = localStorage.getItem('token');
    let token = null;
    if (getToken) {
      token = JSON.parse(getToken);
    }
    const httpOptions = this.createHttpOptions(token.value);
    console.log("****");
    return this.http.post<any>(`${baseURL}/properties`, accommodation, httpOptions).pipe(
      tap((data) => { 
          console.log("Rezultat kreiranog smestaja"); 
          console.log(data);
      }),
      catchError((error) => {
        this.toastr.error(error.message, 'Greška pri kreiranju aplikacije!');

        return of(false);
      })
    );
  }

  public addManyImages(accommodationId: string, imagesFiles: any): Observable<any> {

    const getToken = localStorage.getItem('token');
    let token = null;
    if (getToken) {
      token = JSON.parse(getToken);
    }
    const httpOptions = this.createHttpOptionsForFiles(token.value);
    console.log("***---***");
    return this.http.post<any>(`${RootLocation}${MainBackend}images/properties/${accommodationId}/many`, imagesFiles, httpOptions).pipe(
      tap(() => { }),
      catchError((error) => {
        this.toastr.error(error.message, 'Greška pri učitavanju slika!');

        return of(false);
      })
    );
  }

  public downloadFile(data: any, fileName: any, contentType: any): void {
    const blob: Blob = new Blob([data], {type: contentType});
    const objectUrl: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();        

    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  }
}
