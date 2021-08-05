import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccommodationService } from 'src/app/services/accommodation.service';
import { AccommodationServiceService } from 'src/app/services/accommodation-service.service';
export interface InputDropDownMenu {
  id: number;
  name: string;
}
export interface Codebook {
  id: string;
  name: string;
  nameEn?: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  form: FormGroup;
  public accommodationTypeMenu: Codebook[] = [];
  public allAccomodationServices: Codebook[] = [];
  public checkboxes: FormControl []=[];

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


  pageSize: number[] = [1];
  results: { name: string, id: number }[] = [{ name: 'Prva stranica', id: 1 }, { name: 'Druga stranica', id: 2 }];

  constructor(public router: Router, 
              public accommodationService: AccommodationService,
              public service : AccommodationServiceService) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.form = new FormGroup({
      location: new FormControl(null),
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 15)),
      numberOfPerson: new FormControl(1),
      numberOfChildren: new FormControl(0),
      accommondationType: new FormControl('25b43e26-dec6-4500-94a9-0226a4868525'),
      wifi: new FormControl(false),
      pool: new FormControl(false),
      spa: new FormControl(false),
      gym: new FormControl(false),
      parking: new FormControl(false),
      tv: new FormControl(false),
      pet_fiendly: new FormControl(false),
      all_inclusive: new FormControl(false),
      half_board: new FormControl(false),
      room_and_board: new FormControl(false),
      breakfast: new FormControl(false),
      mini_kitchen: new FormControl(false),
      kitchen: new FormControl(false),
      private_bathroom: new FormControl(false),
    })
  }

  ngOnInit(): void {
    this.fetchAccomTypes();
    this.fetchAccomServices();
  }

  fetchAccomTypes(): void {
    this.accommodationService.getAccommodationTypes().subscribe((response) => {
      const tmp = [];
      for (const accomType of response) {
        tmp.push({ id: accomType.id, name: accomType.name });
      }
      this.accommodationTypeMenu = tmp;
    });
  }

  fetchAccomServices(): void {
    this.service.getAccommodationServices().subscribe((response) => {
      const tmp = [];
      for (const accomServices of response) {
        tmp.push({ id: accomServices.id, name: accomServices.name, nameEn: accomServices.nameEn });
      }
      this.allAccomodationServices = tmp;
    });
  }

  onSubmitSearh() {
    console.log("Ubaceni podaci iz forme");
    console.log(this.form);
  }

}
