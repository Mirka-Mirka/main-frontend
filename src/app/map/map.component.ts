import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MouseEvent } from '@agm/core';

interface marker {
	lat: number;
	lng: number;
	label: string;
	draggable: boolean;
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 600px; width: 600px;}'], //postavljamo sirinu i visinu mape
})
export class MapComponent {
  lat: number = 45.25;
  lng: number = 19.833549;
  zoom: number = 8;

  markers: marker[] = [
	  {
		  lat:  45.2,
		  lng: 19.7,
		  label: 'A',
		  draggable: true
	  }];

  constructor(
    public dialogRef: MatDialogRef<MapComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {

  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  

  
  markerDragEnd(m: marker, $event: MouseEvent) {
    this.lat =  $event.coords.lat;
    this.lng =  $event.coords.lng;
    console.log('dragEnd', m, $event);
  }

  setLocation() {
    this.dialogRef.close({
      latitude: this.lat,
      longitude: this.lng,
    });
  }
}
