import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationModel } from 'src/app/models/accommodation.model';
import { AccommodationService } from 'src/app/services/accommodation.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  pageSize: number[] = [1];
  results: AccommodationModel[] =[];

  constructor(public router: Router, private accomodationService: AccommodationService, private toastr: ToastrService){
    this.accomodationService.getAccommodations().subscribe((data) => {
      console.log(data);
      
      if (data !== false) {
        this.results = data;
        this.router.navigate(['/home']);
      } else {
        this.toastr.error('Neuspešno prijavljivanje!');
      }
    });
  }

  ngOnInit(): void {
  }

  public onAccommodationPicked(accommodation: AccommodationModel) {
    this.router.navigate([`/accommodation/${accommodation.id}`]);
  }

}
