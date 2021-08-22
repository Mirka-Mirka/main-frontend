import {Component, Input, OnInit} from '@angular/core';
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
  @Input() userId: number | undefined = undefined;
  results: AccommodationModel[] =[];

  constructor(public router: Router, private accomodationService: AccommodationService, private toastr: ToastrService){
    this.accomodationService.getAccommodations(this.userId).subscribe((data) => {
      console.log(data);

      if (data !== false) {
        this.results = data;
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
