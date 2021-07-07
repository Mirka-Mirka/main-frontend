import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  form: FormGroup;

  results: {name: string, id: number}[] = [{name: 'first', id: 1}, {name: 'second', id: 2}];

  constructor(public router: Router) {
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

  public onAccommodationPicked(accommodation: {name: string, id: number}) {
    this.router.navigate([`/accommodation/${accommodation.id}`, {accommodationName: accommodation.name}]);
  }
}
