import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  rangesss = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    this.range = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 15))
    });
    this.rangesss = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 15))
    });
   }

  ngOnInit(): void {
  }

}
