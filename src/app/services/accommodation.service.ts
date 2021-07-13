import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { baseURL } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from "ngx-toastr";
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class AccommodationService {
    constructor(private http: HttpClient, private toastr: ToastrService) {}

    public getAccommodationTypes() {
        return this.http.get<any>(`${baseURL}/types`).pipe(
          tap(() => {}),
          catchError((error) => {
            this.toastr.error(error, 'Error!');
    
            return of(false);
          })
        );
      }
      
  }