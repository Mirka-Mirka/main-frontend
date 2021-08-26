import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Codebook } from 'src/app/components/search/search.component';
import { MapComponent } from 'src/app/map/map.component';
import { MapModel } from 'src/app/map/map.model';
import {
  MatDialog
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccommodationServiceService } from 'src/app/services/accommodation-service.service';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { UserModel } from 'src/app/models/user.model';
import { Token } from 'src/app/models/token.model';
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-accommodation-add',
  templateUrl: './accommodation-add.component.html',
  styleUrls: ['./accommodation-add.component.scss'],
})
export class AccommodationAddComponent implements OnInit {
  form: FormGroup | undefined;
  public accommodationTypeMenu: Codebook[] = [];
  public allAccomodationServices: Codebook[] = [];
  private postAccommodation:any = {};
  private starNumber: number | undefined;
  private currentUser: UserModel | null= null; 
  private currentToken: Token | null= null; 
  private managerId : string| null= null;

  mapInfo: MapModel | undefined;

  constructor(
    public router: Router,
    public accommodationService: AccommodationService,
    public service: AccommodationServiceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {   
  }

  ngOnInit(): void {
    this.fetchAccomTypes();
    this.fetchAccomServices();
   
  }

  fetchAccomTypes(): void {
    this.accommodationService.getAccommodationTypes().subscribe((response) => {
      const tmp = [];
      for (const accomType of response) {
        tmp.push({ id: accomType.id, name: accomType.name });
      }
      this.accommodationTypeMenu = tmp;
    });
  }

  fetchAccomServices(): void {
    this.service.getAccommodationServices().subscribe((response) => {
      const tmp = [];
      for (const accomServices of response) {
        tmp.push({
          id: accomServices.id,
          name: accomServices.name,
          nameEn: accomServices.nameEn,
        });
      }
      this.allAccomodationServices = tmp;
      this.setForm();
    });
  }
  setForm(){
    const getLocalItem= localStorage.getItem('currentUser');
    if (getLocalItem) {
      this.currentUser = JSON.parse(getLocalItem);
    };
    const getToken= localStorage.getItem('token');
    if (getToken) {
      this.currentToken= JSON.parse(getToken);
      if (this.currentToken && this.currentUser?.role =="AGENT"){
        var decodedToken : any = jwtDecode(this.currentToken.type+" "+this.currentToken.value);
        if (decodedToken) {
          this.managerId = decodedToken.sub;
        }
      }
    };

    this.form = new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null),
      price: new FormControl(null),
      numberOfPeople: new FormControl(1),
      numberOfCancellationDays: new FormControl(0),
      accommondationType: new FormControl(
        '25b43e26-dec6-4500-94a9-0226a4868525'
      ),
      street: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      latitude: new FormControl(0.0),
      longitude: new FormControl(0.0)
    });
    this.allAccomodationServices.forEach(item => {
      if(this.form && item.nameEn != undefined){
         this.form.addControl(item.nameEn, new FormControl(''));
      }  
    });
  }

  addAccommodation() {  
      console.log(this.accommodationService);
      if (this.form){
        this.postAccommodation.name = this.form.controls['name'].value;
        this.postAccommodation.description = this.form.controls['description'].value;
        this.postAccommodation.price = parseFloat(this.form.controls['price'].value);
        this.postAccommodation.stars = this.starNumber;
        this.postAccommodation.numberOfCancellationDays = parseInt(this.form.controls['numberOfCancellationDays'].value);
        this.postAccommodation.numberOfPeople = parseInt(this.form.controls['numberOfPeople'].value);
        this.postAccommodation.address = {};
        this.postAccommodation.address.city = this.form.controls['city'].value;
        this.postAccommodation.address.country = this.form.controls['country'].value;
        this.postAccommodation.address.latitude = parseFloat(this.form.controls['latitude'].value);
        this.postAccommodation.address.longitude = parseFloat(this.form.controls['longitude'].value);
        this.postAccommodation.address.street = this.form.controls['street'].value;
        this.postAccommodation.typeId = this.form.controls['accommondationType'].value;
        this.postAccommodation.imageUrls = [];
        this.postAccommodation.agentId = this.managerId;
        this.postAccommodation.services = new Array<string>();
        this.allAccomodationServices.forEach(item => {
          if(this.form && item.nameEn != undefined){
            console.log("------"+item.id);
            console.log(this.form.controls[item.nameEn].value);
            console.log(item.name);
            this.form.controls[item.nameEn];
            if(this.form.controls[item.nameEn].value){
              this.postAccommodation.services.push(item.id);
            }
            
          }   
        });
        console.log(this.postAccommodation);
        this.accommodationService.postAccommodation(this.postAccommodation);
      }

  }

  openMapAdd() {

    let dialogRef = this.dialog.open(MapComponent);

    dialogRef.afterClosed().subscribe((res) => {
      console.log('Successfuly checked coordinates.');
      this.snackBar.open('Successfuly checked coordinates.', '', {
        duration: 2500,
      });
      if (res == undefined) {
        return;
      }
      if(this.form){
        this.form.controls['latitude'].patchValue(res.latitude);
        this.form.controls['longitude'].patchValue(res.longitude);
      }

    });
  }

  onStarClick(event : number){
      this.starNumber = event + 1;
  }
}
