import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationModel } from 'src/app/models/accommodation.model';
import { AccommodationService } from 'src/app/services/accommodation.service';
import {ToastrService} from "ngx-toastr";
import { UserModel, UserRole } from 'src/app/models/user.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
 private user :UserModel | undefined = undefined;
  results: AccommodationModel[] =[];

  constructor(public router: Router, private accomodationService: AccommodationService, private toastr: ToastrService){
   
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    let userId = undefined;
    if (currentUser) {
      this.user = JSON.parse(currentUser);
    }
    if(this.router.url.indexOf('/accommodation') >= 0 && this.user && this.user.role === UserRole.AGENT){
        userId = this.user.id;
    }
    this.accomodationService.getAccommodations(userId).subscribe((data) => {
      console.log(data);

      if (data !== false) {
        this.results = data;
      } else {
        this.toastr.error('Neuspešno prijavljivanje!');
      }
    });
  }

  public onAccommodationPicked(accommodation: AccommodationModel) {
    this.router.navigate([`/accommodation/${accommodation.id}`]);
  }

}
