import { Injectable } from "@angular/core"
import { tap,catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MainBackend, ReservationMS, RootLocation } from 'src/environments/environment';
import { of } from 'rxjs';
import { ReservationModel } from "../models/reservation.model";
import { baseURL } from "src/environments/environment.prod";


@Injectable({
    providedIn: 'root'
})
export class ReservationService{

    constructor (private http: HttpClient, private toastr: ToastrService){

    }
    private createHttpOptions(token: string): any {
        return { headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })};
    }

    public getPropertyReservations(accomodationId: string){
        const getToken= localStorage.getItem('token');
        let token = null;
        if (getToken) {
          token= JSON.parse(getToken);
        }
        const httpOptions = this.createHttpOptions(token.value);
        return this.http.get<any>(`${RootLocation}${MainBackend}reservations/property/${accomodationId}`, httpOptions).pipe(
            tap(() => { }),
            catchError((error) => {
                this.toastr.error(error.message, 'Error!');

                return of(false);
            })
        );
    }


    public getAccommodations(userId: number | undefined) {
        const getToken= localStorage.getItem('token');
        let token = null;
        if (getToken) {
          token= JSON.parse(getToken);
        }
        const httpOptions = this.createHttpOptions(token.value);
        return this.http.get<any>(`${RootLocation}${MainBackend}properties` + (userId ? `/${userId}/manager` : ''), httpOptions).pipe(
            tap(() => { }),
            catchError((error) => {
                this.toastr.error(error.message, 'Error!');

                return of(false);
            })
        );
    }

    public  getUserPropertyReservations(userId: string) {
        const getToken= localStorage.getItem('token');
        let token = null;
        if (getToken) {
          token= JSON.parse(getToken);
        }
        const httpOptions = this.createHttpOptions(token.value);
        
        return this.http.get<any>(`http://localhost:8765/reservations-microservice/reservations`, httpOptions).pipe(
            tap((data) => data),
            catchError((error) => {
                this.toastr.error(error.message, 'Error!');

                return of(false);
            })
        );
    }

    public createReservation(registrationData:ReservationModel) {
        const getToken= localStorage.getItem('token');
        let token = null;
        if (getToken) {
          token= JSON.parse(getToken);
        }
        const httpOptions = this.createHttpOptions(token.value);
        return this.http.post<any>(`http://localhost:8765/reservations-microservice/reservations`, registrationData, httpOptions).pipe(
            tap(() => { }),
            catchError((error) => {
                this.toastr.error(error.message, 'Error!');

                return of(false);
            })
        ); 

    }

    public postReservation(registrationData:ReservationModel) {
        const getToken= localStorage.getItem('token');
        let token = null;
        if (getToken) {
          token= JSON.parse(getToken);
        }
        const httpOptions = this.createHttpOptions(token.value);
        return this.http.post<any>(`${baseURL}/reservations/check/${registrationData.propertyId}`, registrationData, httpOptions)
            .pipe(
                tap((data) => {
                console.log(data);
            }),
            catchError(error => {
                this.toastr.error(error, 'Error!');
                return of(false);
      }));
    }

    public changeReservationStatus(registrationData:ReservationModel) {
        const getToken= localStorage.getItem('token');
        let token = null;
        if (getToken) {
          token= JSON.parse(getToken);
        }
        const httpOptions = this.createHttpOptions(token.value);
        return this.http.post<any>(`${RootLocation}${ReservationMS}reservations/${registrationData.id}`, registrationData, httpOptions)
            .pipe(
                tap((data) => {
                console.log("results "+data);
            }),
            catchError(error => {
                this.toastr.error(error, 'Error!');
                return of(false);
      }));
    }

    // checkReservation(accomodationId: number, reservation:Reservation) : Observable<any> {
    //     return this.http.post(this.appUrl.RootLocation + this.appUrl.ReservationService + 'reservations/check/'+accomodationId, reservation, this.getRequestOptions()).map(this.extractData);
    // }


    // changeReservationStatus(reservation:Reservation) {
    //     return this.http.put(this.appUrl.RootLocation + this.appUrl.ReservationService + 'reservations/' + reservation.id, reservation, this.getRequestOptions());
    // }


    // postReservation(reservation: Reservation): Observable<any>  {
    //     return this.http.post(this.appUrl.RootLocation + this.appUrl.ReservationService + 'reservations', reservation , this.getRequestOptions());
    // }
}