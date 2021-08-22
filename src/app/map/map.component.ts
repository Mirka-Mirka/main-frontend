import { Component, Inject, OnInit, Input } from '@angular/core';
import { MapModel } from './map.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccommodationModel } from '../models/accommodation.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 600px; width: 600px;}'], //postavljamo sirinu i visinu mape
})
export class MapComponent implements OnInit {
  latitudeOnClick: number = 45.267136;
  longitudeOnClick: number = 19.833549;
  public accomodation: AccommodationModel | undefined;
  public mapInfo: MapModel;
  public watching: boolean = false;
  public adding: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<MapComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.mapInfo = new MapModel(45.267136, 19.833549, '', '', '', '');
    this.mapInfo = data.mapInfo;
    this.adding = data.adding;
    this.watching = data.watching;
    console.log(data);
  }

  ngOnInit() {}

  onClick(res: any) {
    this.latitudeOnClick = res.coords.lat;
    this.longitudeOnClick = res.coords.lng;
  }

  setLocation() {
    this.dialogRef.close({
      latitude: this.latitudeOnClick,
      longitude: this.longitudeOnClick,
    });
  }
}
