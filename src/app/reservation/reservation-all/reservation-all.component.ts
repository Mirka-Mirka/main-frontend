import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ReservationModel } from 'src/app/models/reservation.model';
import { UserModel } from 'src/app/models/user.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-all',
  templateUrl: './reservation-all.component.html',
  styleUrls: ['./reservation-all.component.scss']
})
export class ReservationAllComponent implements OnInit {

  public reservations: Array<ReservationModel> = [];
  private accomodationId: string | undefined;
  private currentUser: UserModel | null = null;
  private userRole: boolean;
  private managerRole: boolean;
  displayedColumns: string[] = ['naziv','startDate', 'endDate', 'price', 'numberP', 'status'];
  public dataSource = new MatTableDataSource<ReservationModel[]>();

  constructor(
    private date: DatePipe,
    private reservationService: ReservationService,
    private route: ActivatedRoute
  ) {
    this.userRole = false;
    this.managerRole = false;
    this.accomodationId =this.route.snapshot.params.id;
    this.dataSource.data = eval as any;
  }

  ngOnInit() {
    this.createPermisions();
    if (this.accomodationId && this.currentUser && this.currentUser.id) {
      
        this.reservationService
          .getUserPropertyReservations(this.currentUser.id?.toString())
          .subscribe((res: any) => {
            this.reservations = res.map((data:any) =>{
              console.log(data);
              data.startDate = data.startDate.substring(0, 10);
              data.endDate = data.endDate.substring(0, 10);
              return data;
             });
            this.dataSource.data = res as any;
            console.log(this.reservations);
          });
      
    }
  }

  createPermisions() {
    this.userRole = false;
    this.managerRole = false;

    const getLocalItem = localStorage.getItem('currentUser');
    if (getLocalItem) {
      this.currentUser = JSON.parse(getLocalItem);
      if (this.currentUser && this.currentUser?.role == 'USER') {
        this.userRole = true;
      } else if (this.currentUser && this.currentUser?.role == 'AGENT') {
        this.managerRole = true;
      }
    }
  }

}
