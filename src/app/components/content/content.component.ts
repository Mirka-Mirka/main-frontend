import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  form: FormGroup;

  constructor() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.form = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 15)),
      numberOfPerson: new FormControl('person1'),
      numberOfChildren: new FormControl('one'),
      accommondationType: new FormControl('all'),
      wifi: new FormControl(false),
      pool: new FormControl(false),
      spa: new FormControl(false),
      gym: new FormControl(false),
    })
  }

  ngOnInit(): void {
  }

}
