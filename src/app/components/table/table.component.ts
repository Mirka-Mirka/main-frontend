import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(public router: Router) { }
  pageSize: number[] = [1];
  results: { name: string, id: number }[] = [{ name: 'Prva stranica', id: 1 }, { name: 'Druga stranica', id: 2 }];

  ngOnInit(): void {
  }

  public onAccommodationPicked(accommodation: { name: string, id: number }) {
    this.router.navigate([`/accommodation/${accommodation.id}`, { accommodationName: accommodation.name }]);
  }

}
