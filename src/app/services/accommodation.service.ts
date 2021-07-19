import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { baseURL } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from "ngx-toastr";
import { of } from 'rxjs';
import { AccommodationModel } from "../models/accommodation.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AccommodationService {
    constructor(private http: HttpClient, private toastr: ToastrService) { }

    public getAccommodationTypes() {
        return this.http.get<any>(`${baseURL}/types`).pipe(
            tap(() => { }),
            catchError((error) => {
                this.toastr.error(error, 'Error!');

                return of(false);
            })
        );
    }

    
    public getAccommodations() {
        return this.http.get<any>(`${baseURL}/properties`).pipe(
            tap(() => { }),
            catchError((error) => {
                this.toastr.error(error, 'Error!');

                return of(false);
            })
        );
    }

    public getAccommodation(id: string) {
        return this.http.get<any>(`${baseURL}/properties/${id}`).pipe(
            tap(() => { }),
            catchError((error) => {
                this.toastr.error(error, 'Error!');

                return of(false);
            })
        );
    }

    // public postAccommodation(accommodation: AccommodationModel): Observable<any> {
    //     return this.http.post<any>(`${baseURL}/properties`, accommodation).pipe(
    //         tap(() => { }),
    //         catchError((error) => {
    //             this.toastr.error(error, 'Error!');

    //             return of(false);
    //         })
    //     );
    // }

    // public deleteAccommodation((Id: string) {
    //     return this.http.delete<any>(`${baseURL}/properties/${Id}`).pipe(
    //         tap(() => { }),
    //         catchError((error) => {
    //             this.toastr.error(error, 'Error!');

    //             return of(false);
    //         })
    //     );
    // }

    // public editAccommodation(accommodation: AccommodationModel) {
    // return this.http.get<any>(`${baseURL}//properties/${Id}`, accommodation).pipe(
    //     tap(() => { }),
    //     catchError((error) => {
    //         this.toastr.error(error, 'Error!');

    //         return of(false);
    //     })
    // );
}
