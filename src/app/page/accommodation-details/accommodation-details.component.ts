import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  public hasCoord = false;
  public mapLat: number = 45.255;
  public mapLng: number = 19.844722;
  public zoom = 15;

  constructor(public router: Router, private route: ActivatedRoute,
    private accomodationService: AccommodationService, private toastr: ToastrService, private snackBar:MatSnackBar,) {
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
        this.hasCoord = true;
        this.mapLat = data.address.latitude;
        this.mapLng = data.address.longitude;
        this.accommodationDetails = data;
      } else {
        this.hasCoord = false;
        this.mapLat = 45.255;
        this.mapLng = 19.844722;
        this.toastr.error('Neuspešno prijavljivanje!');
      }
    });
  }

  ngOnInit(): void {
  }

  onDeleteAccommodation(){
    this.accomodationService.deleteAccommodation(this.accomodationId.toString()).subscribe(
      ()=>{
        console.log('Smeštaj ' + this.accommodationDetails?.name + ' successfuly deleted');
        this.snackBar.open("Smeštaj " + this.accommodationDetails?.name + " je uspešno izbrisan!", "", { duration: 2500,});
        this.ngOnInit();
      },
      error=>{
        alert('Smeštaj ' + this.accommodationDetails?.name + ' nije izbrisan! Došlo je do greške');
      console.log(error);}
    );
  }


  onEditAccommodation(){

  }
}
