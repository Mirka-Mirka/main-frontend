import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from "ngx-toastr";
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AccommodationServiceService {
    constructor(private http: HttpClient, private toastr: ToastrService) { }

    public getAccommodationServices() {
        return this.http.get<any>(`http://localhost:8765/services-microservice/services`).pipe(
            tap(() => { }),
            catchError((error) => {
                this.toastr.error(error, 'Error!');

                return of(false);
            })
        );
    }
}
