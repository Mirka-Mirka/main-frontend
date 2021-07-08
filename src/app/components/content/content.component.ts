import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
export interface InputDropDownMenu {
  id: number;
  name: string;
}
export interface InputDropDownMenuString{
  id: string;
  name: string;
}
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  form: FormGroup;
  personNumberMenu: InputDropDownMenu[] = [
    { id: 1, name: '1 osoba' },
    { id: 2, name: '2 osobe' },
    { id: 3, name: '3 osobe' },
    { id: 4, name: '4 osobe' },
    { id: 5, name: '5 osobe' },
    { id: 6, name: '6 osobe' },
    { id: 7, name: '7 osobe' }
  ];
  childrenNumberMenu: InputDropDownMenu[] = [
    { id: 0, name: 'bez dece' },
    { id: 1, name: '1 dete' },
    { id: 2, name: '2 deteta' },
    { id: 3, name: '3 deteta' },
    { id: 4, name: '4 deteta' },
    { id: 5, name: '5 deteta' },
    { id: 6, name: '6 deteta' },
    { id: 7, name: '7 deteta' }
  ];
  accommodationTypeMenu: InputDropDownMenuString[] = [
    { id: 'all', name: 'svi tipovi' },
    { id: 'hotel', name: 'Hotel' },
    { id: 'motel', name: 'Motel' },
    { id: 'villa', name: 'Vila' },
    { id: 'apartman', name: 'Apartman' },
    { id: 'lake resort', name: 'Odmaralište' }
  ];


  pageSize: number[]=[1];
  results: { name: string, id: number }[] = [{ name: 'Prva stranica', id: 1 }, { name: 'Druga stranica', id: 2 }];

  constructor(public router: Router) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.form = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 15)),
      numberOfPerson: new FormControl(1),
      numberOfChildren: new FormControl(0),
      accommondationType: new FormControl('all'),
      wifi: new FormControl(false),
      pool: new FormControl(false),
      spa: new FormControl(false),
      gym: new FormControl(false),
    })
  }

  ngOnInit(): void {
  }

  public onAccommodationPicked(accommodation: { name: string, id: number }) {
    this.router.navigate([`/accommodation/${accommodation.id}`, { accommodationName: accommodation.name }]);
  }

  onSubmitSearh(data: FormGroup) {
    this.form = data;
  }
}
