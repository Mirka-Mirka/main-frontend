import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AccommodationModel } from 'src/app/models/accommodation.model';
import { AccommodationService } from 'src/app/services/accommodation.service';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.scss']
})
export class AccommodationDetailsComponent implements OnInit {
  accomodationId: number;
  accommodationDetails: AccommodationModel | null = null;
  public imageObject: Array<object> = [];

  constructor(public router: Router, private route: ActivatedRoute,
    private accomodationService: AccommodationService, private toastr: ToastrService) {
    this.accomodationId = this.route.snapshot.params.id;
    this.accomodationService.getAccommodation(this.accomodationId.toString()).subscribe((data) => {

      if (data !== false) {
        if (data.imageUrls) {
          this.imageObject = data.imageUrls.map((imageUrl: any) => {
            return {
              image: imageUrl,
              thumbImage: imageUrl,
              alt: '',
              title: ''
            }
           
          });
        }

        this.accommodationDetails = data;
        console.log(this.accommodationDetails);

      } else {
        this.toastr.error('Neuspešno prijavljivanje!');
      }
    });
  }

  ngOnInit(): void {
  }

}
