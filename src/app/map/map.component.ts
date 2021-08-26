import { Component, OnInit,Input } from '@angular/core';
import {MapModel} from './map.model'
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 600px; width: 600px;}'] //postavljamo sirinu i visinu mape
})
export class MapComponent implements OnInit {

  latitudeOnClick:number;
  longitudeOnClick:number;
  public accomodation:any ={};
  public mapInfo: MapModel;
  public watching:boolean = false;
  public adding:boolean = true;

  constructor(public dialogRef: MatDialogRef<MapComponent>) {
    this.latitudeOnClick = 45.263657;
    this.longitudeOnClick = 19.830084;
    this.mapInfo =  new MapModel(45.263657, 19.830084,'','','','');
  }

  onClick(res:any){
    this.latitudeOnClick=res.coords.lat;
    this.longitudeOnClick=res.coords.lng;
  }

  setLocation(){
    this.dialogRef.close({
      latitude : this.latitudeOnClick, 
      longitude : this.longitudeOnClick
    });
  }

  ngOnInit() {
   
  }

}