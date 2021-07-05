import { Component, Input, OnInit } from '@angular/core';
export interface StarsColored {
  index: number;
  state: boolean;
}


@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {
  condition=false;
 


  constructor() { 

  }

  ngOnInit(): void {
  }

}
