import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Codebook } from 'src/app/components/search/search.component';
import { MapComponent } from 'src/app/map/map.component';
import { MapModel } from 'src/app/map/map.model';
import { Token } from 'src/app/models/token.model';
import { UserModel } from 'src/app/models/user.model';
import { AccommodationServiceService } from 'src/app/services/accommodation-service.service';
import { AccommodationService } from 'src/app/services/accommodation.service';
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-accommodation-edit',
  templateUrl: './accommodation-edit.component.html',
  styleUrls: ['./accommodation-edit.component.scss']
})
export class AccommodationEditComponent implements OnInit {

  form: FormGroup | undefined;
  public accommodationTypeMenu: Codebook[] = [];
  public allAccomodationServices: Codebook[] = [];
  private editAccommodation:any = {};
  private starNumber: number | undefined;
  private currentUser: UserModel | null= null;
  private currentToken: Token | null= null;
  private managerId : string| null= null;
  public accFiles: string[] = [];
  private files: any[] = [];
  public numberOfUploadedFiles: number = 0;
  mapInfo: MapModel | undefined;
  public accomodationId;
  public serviceEl = new Array<string>();

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public accommodationService: AccommodationService,
    public service: AccommodationServiceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.accomodationId =this.route.snapshot.params.id;
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
    this.accommodationService.getAccommodation(this.accomodationId.toString()).subscribe((acc) => {
      this.starNumber = acc.stars;
      this.files = acc.imageUrls;
      this.serviceEl.push('688685d0-56ba-4532-93bb-964d82618a13');
      this.serviceEl.push('6b705b07-575f-4dd0-9677-c3bcce5acb8c');
    this.form = new FormGroup({
      name: new FormControl(acc.name),
      description: new FormControl(acc.description),
      price: new FormControl(acc.price),
      numberOfPeople: new FormControl(acc.numberOfPeople),
      numberOfCancellationDays: new FormControl(acc.numberOfCancellationDays),
      accommondationType: new FormControl(
          acc.type
      ),
      street: new FormControl(acc.address.street),
      city: new FormControl(acc.address.city),
      country: new FormControl(acc.address.country),
      latitude: new FormControl(acc.address.latitude),
      longitude: new FormControl(acc.address.longitude),

    });

    this.allAccomodationServices.forEach(item => {
      if(this.form && item.nameEn != undefined){
         this.form.addControl(item.nameEn, new FormControl(''));
         this.form.controls[item.nameEn].setValue(this.serviceEl.includes(item.id));
      }
    });
  })
  }
  onChecked(item: any){
    console.log(item.id);
    console.log(this.serviceEl);
    if(this.serviceEl.includes(item.id)){
      return true;
    }
    return false;
  }

  async editAccom() {
      console.log(this.accommodationService);
      if (this.form){
        this.editAccommodation.name = this.form.controls['name'].value;
        this.editAccommodation.description = this.form.controls['description'].value;
        this.editAccommodation.price = parseFloat(this.form.controls['price'].value);
        this.editAccommodation.stars = this.starNumber;
        this.editAccommodation.numberOfCancellationDays = parseInt(this.form.controls['numberOfCancellationDays'].value);
        this.editAccommodation.numberOfPeople = parseInt(this.form.controls['numberOfPeople'].value);
        this.editAccommodation.address = {};
        this.editAccommodation.address.city = this.form.controls['city'].value;
        this.editAccommodation.address.country = this.form.controls['country'].value;
        this.editAccommodation.address.latitude = parseFloat(this.form.controls['latitude'].value);
        this.editAccommodation.address.longitude = parseFloat(this.form.controls['longitude'].value);
        this.editAccommodation.address.street = this.form.controls['street'].value;
        this.editAccommodation.typeId = this.form.controls['accommondationType'].value;
        // this.editAccommodation.imageUrls = [];
        this.editAccommodation.category = "NONE";
        // this.editAccommodation.agentId = this.managerId;
        this.editAccommodation.services = new Array<string>();
        this.allAccomodationServices.forEach(item => {
          if(this.form && item.nameEn != undefined){
            console.log("------"+item.id);
            console.log(this.form.controls[item.nameEn].value);
            console.log(item.name);
            this.form.controls[item.nameEn];
            if(this.form.controls[item.nameEn].value){
              this.editAccommodation.services.push(item.id);
            }

          }
        });
        console.log(this.editAccommodation);
        this.accommodationService.editAccommodation(this.accomodationId, this.editAccommodation)
        .subscribe((response: any) => {
          if (response !== false) {
            this.snackBar.open("Podaci o smeštaju su izmenjeni!", "", { duration: 3000,});
            this.router.navigate(['/accommodation']);
            // const formData = new FormData();
            // this.files.forEach(file => {
            //   formData.append('images', file, file.name);
            // });
            // if(this.files) {
            //   let size = 0;
            //   this.files.forEach((file) => {
            //     size += file.size;
            //   })
            //   if(size > 10485759) {
            //     this.toastr.error('Maximum upload size of 10 MB exceeded', 'Error!');
            //   } else {
            //     this.router.navigate(['/registration-admin'], navigationExtras);
            //   }
            // } else {
            //   this.router.navigate(['/registration-admin'], navigationExtras);
            // }

            // this.accommodationService.addManyImages(response.id, formData)
            //   .subscribe((res: any) => {
            //     if(res){
            //       console.log(res);
            //       if (res !== false) {
            //         this.snackBar.open("Slike su uspešno dodate", "", { duration: 3000,});
            //         this.router.navigate(['/accommodation']);
            //       }
            //     }
                
            //   });
          }
        });

        // get accomodation id from response
        // call accomodation service, dodaj novi servis za upload vise slika (prosledi this.files kako je uradjeno na CompanyComponent)
        // await koji ce taj upload raditi
        // redirect na rezervacije
      }

  }

  // openMapAdd() {

  //   let dialogRef = this.dialog.open(MapComponent);

  //   dialogRef.afterClosed().subscribe((res) => {
  //     console.log('Successfuly checked coordinates.');
  //     this.snackBar.open('Successfuly checked coordinates.', '', {
  //       duration: 2500,
  //     });
  //     if (res == undefined) {
  //       return;
  //     }
  //     if(this.form){
  //       this.form.controls['latitude'].patchValue(res.latitude);
  //       this.form.controls['longitude'].patchValue(res.longitude);
  //     }

  //   });
  // }

  openMapAdd(){
    let config = new MatDialogConfig();
    config.height='700px';
    config.width='700px';

    this.mapInfo = new MapModel(45.242268, 19.842954,
    "",
    "" , "" , "");

    let dialogRef = this.dialog.open(MapComponent);
    dialogRef.componentInstance.mapInfo = this.mapInfo;
    dialogRef.componentInstance.adding = true;
    dialogRef.componentInstance.watching = false;

    dialogRef.afterClosed().subscribe((res) => {
      console.log("Successfuly checked coordinates.")
      this.snackBar.open("Koordinate su uspešno postavljene.", "", { duration: 2500,});
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

  onFileDownloaded($event: any) {
    console.log('onFileDownloaded');
    const file = this.files[$event];
    this.accommodationService.downloadFile(file, file.name, file.type);
  }

  onFilesUploaded($event: any) {
    console.log('onFilesUploaded');
    this.files = $event;
    this.numberOfUploadedFiles = this.files.length;
  }
}



