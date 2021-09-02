import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ReservationModel, ReservationStatus } from '../models/reservation.model';
import { ReservationService } from '../services/reservation.service';
import { UserModel } from '../models/user.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  public reservations : Array<ReservationModel> = [];
  private accomodationId : string | undefined;
  private currentUser: UserModel | null= null; 
  private userRole: boolean;
  private managerRole: boolean;
  displayedColumns: string[] = ['naziv', 'id', 'price', 'numberP'];
  public dataSource = new MatTableDataSource<ReservationModel[]>();

  constructor(private reservationService:ReservationService,
              private snackBar:MatSnackBar,
              private route: ActivatedRoute,
              public dialog:MatDialog) {
                this.userRole=false;
                this.managerRole=false;
            //     this.route.queryParams.subscribe(params => {
            //     this.accomodationId = params["accId"];
            //     console.log(this.accomodationId);
            //     console.log(params);
            // });
            // this.dataSource.data = eval as any;
  }

  ngOnInit() {
    this.createPermisions();
    if(this.accomodationId){
        if(this.userRole == true){
            this.reservationService.getUserPropertyReservations(this.accomodationId).subscribe(
              (res: any) => {this.reservations = res; 
                  console.log(this.reservations)}
              );
          }
          else{
            this.reservationService.getPropertyReservations(this.accomodationId).subscribe(stream => {
              // do it this way
              this.reservations = stream;
               this.dataSource.data = stream as any;
               console.log(this.reservations);
            // note if you simply put it as 'this.dataSource.data = stream' then TS show you error as '[ts] Type 'string' is not assignable to type '{}[]''
           });
            // this.reservationService.getPropertyReservations(this.accomodationId).subscribe(
            //   (res: any) => {this.reservations = res; 
            //       console.log(this.reservations)}
            // );
          }
    }  
   
  }

  createPermisions(){
    this.userRole=false;
    this.managerRole=false;

    const getLocalItem= localStorage.getItem('currentUser');
    if (getLocalItem) {
      this.currentUser = JSON.parse(getLocalItem);
      if (this.currentUser && this.currentUser?.role =="USER"){
        this.userRole=true;
      } else if(this.currentUser && this.currentUser?.role =="AGENT"){
        this.managerRole=true;
      }
     }  
  };


//   addRating(reservation:Reservation){
//       let config = new MatDialogConfig();
//       config.height='700px';
//       config.width='700px';

//       let dialogRef = this.dialog.open(RatingComponent,config);
//       dialogRef.componentInstance.reservationId = reservation.id;
//       dialogRef.afterClosed().subscribe(result => {
//       this.ngOnInit();
//     });
//   }

  completeReservation(reservation:ReservationModel){
    
    reservation.reservationStatus=ReservationStatus.SUCCESSFUL;

    this.reservationService.changeReservationStatus(reservation).subscribe(
      (res: any) => { console.log(res) }
    );
  }

  reservationHasCompleted(reservation:ReservationModel){
    if(reservation.reservationStatus.toString()=="SUCCESSFUL"){
      return true;
    }
    return false;
  }

}
