import { Component, OnInit,Input } from '@angular/core';
import {MapModel} from './map.model'
import { MatDialogRef } from '@angular/material/dialog';
import { AccommodationModel } from '../models/accommodation.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 600px; width: 600px;}'] //postavljamo sirinu i visinu mape
})
export class MapComponent implements OnInit {

  latitudeOnClick: number = 45.267136;
  longitudeOnClick: number = 19.833549;
  public accomodation: AccommodationModel| undefined;
  public mapInfo: MapModel;
  public watching: boolean = false;
  public adding: boolean = false;

  constructor(public dialogRef: MatDialogRef<MapComponent>) {
    this.mapInfo = new MapModel(45.267136, 19.833549,
      "",
      "" , "" , "");
  }

  ngOnInit() {
  }

  onClick(res:any){
    this.latitudeOnClick=res.coords.lat;
    this.longitudeOnClick=res.coords.lng;
  }

  setLocation(){
    this.dialogRef.close({latitude : this.latitudeOnClick, longitude : this.longitudeOnClick});
  }


}
