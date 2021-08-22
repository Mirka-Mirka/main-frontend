import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Codebook } from 'src/app/components/search/search.component';
import { MapComponent } from 'src/app/map/map.component';
import { MapModel } from 'src/app/map/map.model';
import {
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccommodationServiceService } from 'src/app/services/accommodation-service.service';
import { AccommodationService } from 'src/app/services/accommodation.service';

@Component({
  selector: 'app-accommodation-add',
  templateUrl: './accommodation-add.component.html',
  styleUrls: ['./accommodation-add.component.scss'],
})
export class AccommodationAddComponent implements OnInit {
  form: FormGroup;
  public accommodationTypeMenu: Codebook[] = [];
  public allAccomodationServices: Codebook[] = [];
  nAccommodation: any = {};

  // public accommodationTypes: Array<AccomodationType>;
  // public accommodationServices: Array<AccomodationServices>;
  // public places:Array<Place>;
  mapInfo: MapModel | undefined;

  constructor(
    public router: Router,
    public accommodationService: AccommodationService,
    public service: AccommodationServiceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
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
      longitude: new FormControl(0.0),
    });
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
    });
  }

  addAccommodation() {
    console.log('form');
  }

  openMapAdd() {
    let config = new MatDialogConfig();
    config.height = '700px';
    config.width = '700px';

    this.mapInfo = new MapModel(45.242268, 19.842954, '', '', '', '');

    let dialogRef = this.dialog.open(MapComponent, {
      data: {
        mapInfo: this.mapInfo,
        adding: true,
        watching: false
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log('Successfuly checked coordinates.');
      this.snackBar.open('Successfuly checked coordinates.', '', {
        duration: 2500,
      });
      if (res == undefined) {
        return;
      }
      this.nAccommodation.latitude = res.latitude;
      this.nAccommodation.longitude = res.longitude;
    });
  }
}
