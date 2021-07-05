import { Component, OnInit } from '@angular/core';

export interface StarsColored {
  index: number;
  state: boolean;
}

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {

  numArray : StarsColored[] = [
    { index: 0, state: false },
    { index: 1, state: false },
    { index: 2, state: false },
    { index: 3, state: false },
    { index: 4, state: false }
  ];
  numberOfColoredStar: StarsColored;

  constructor() {
    this.numberOfColoredStar= { index: -1, state: false }
   }

  ngOnInit(): void {
  }

  onClickStar(clickedItem: number){
   
    this.numArray[clickedItem].state = !this.numArray[clickedItem].state; // flips the boolean value for the clicked item
    
    for (let item of this.numArray) {
      if (item == this.numArray[clickedItem]) {
        item.state = true;
      }
    }
  }

}
