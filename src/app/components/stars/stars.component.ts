import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';

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

  numArray: number[] = [0, 1, 2, 3, 4];
  grade: number = -1;
  @Output() starNumberEvent = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onClickStar(clickedItem: number){
    this.grade = clickedItem; 
    this.starNumberEvent.emit(clickedItem);
  }

}
