import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AccommodationModel } from 'src/app/models/accommodation.model';
import { AccommodationService } from 'src/app/services/accommodation.service';
import {ReservationService} from "../../services/reservation.service";
import {ReservationModel, ReservationStatus} from "../../models/reservation.model";
import { UserModel } from 'src/app/models/user.model';

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
  private userRole: boolean = false;
  private managerRole: boolean = false;
  private guestMode: boolean = false;
  private currentUser: UserModel | null = null;

  constructor(public router: Router, private route: ActivatedRoute,
    private reservationService: ReservationService,
    private accomodationService: AccommodationService, private toastr: ToastrService, private snackBar:MatSnackBar,) {
    this.accomodationId = this.route.snapshot.params.id;
    this.accomodationService.getAccommodation(this.accomodationId.toString()).subscribe((data) => {
  
      const getLocalItem = localStorage.getItem('currentUser');
      if (getLocalItem) {
        this.currentUser = JSON.parse(getLocalItem);
        if (this.currentUser && this.currentUser?.role == 'USER') {
          this.userRole = true;
        } else if (this.currentUser && this.currentUser?.role == 'AGENT') {
          this.managerRole = true;
        }
      }
      this.guestMode = (this.userRole == false && this.managerRole == false)
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
        this.toastr.error('Neuspešno dobavljanje podataka!');
      }
    });
  }

  createPermisions() {
    this.userRole = false;
    this.managerRole = false;

    const getLocalItem = localStorage.getItem('currentUser');
    if (getLocalItem) {
      this.currentUser = JSON.parse(getLocalItem);
      if (this.currentUser && this.currentUser?.role == 'USER') {
        this.userRole = true;
      } else if (this.currentUser && this.currentUser?.role == 'AGENT') {
        this.managerRole = true;
      }
    }
  }

  ngOnInit(): void {
  }

  isManager(){
    return this.managerRole; 
  }
  isUser(){
    return this.userRole; 
  }
  isGuest(){
    return this.guestMode; 
  }

  onDeleteAccommodation(){
    this.accomodationService.deleteAccommodation(this.accomodationId.toString()).subscribe(
      ()=>{
        console.log('Smeštaj ' + this.accommodationDetails?.name + ' successfuly deleted');
        this.snackBar.open("Smeštaj " + this.accommodationDetails?.name + " je uspešno izbrisan!", "", { duration: 2500,});
        this.ngOnInit();
        this.router.navigate([`/accommodation`]);
      },
      error=>{
        alert('Smeštaj ' + this.accommodationDetails?.name + ' nije izbrisan! Došlo je do greške');
      console.log(error);}
    );
  }

  onAddImages(){
    this.router.navigate([`accommodation/add-images/${this.accomodationId}`]);
  }


  onEditAccommodation(){

  }

  onReserve(){
    const reservation = new ReservationModel({
      price: this.accommodationDetails?.price ? this.accommodationDetails.price : 0,
      propertyId: this.accomodationId,
      numberOfPeople: this.accommodationDetails?.numberOfPeople ? this.accommodationDetails.numberOfPeople : 0,
      startDate: '2021-09-02T20:19:10.235Z',
      endDate: '2021-09-04T20:19:10.235Z',
    });
    this.reservationService.createReservation(reservation).subscribe(
      ()=>{
        this.router.navigate([`/accommodation/view-reservations/${this.accomodationId}`]);
      }
    );
    
  }
}
