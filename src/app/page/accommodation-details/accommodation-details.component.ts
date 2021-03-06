import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.scss']
})
export class AccommodationDetailsComponent implements OnInit {
  accomodationId: number;

  constructor(private route: ActivatedRoute) { 
    this.accomodationId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
  }

}
