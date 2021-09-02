import { AccommodationModel } from './accommodation.model';

export class ReservationModel {

    id?:string;
    price:number;
    propertyId: number;
    numberOfPeople:number;
    startDate:string;
    endDate:string;
    // propertyResponse : AccommodationModel;
    reservationStatus? : ReservationStatus;

    constructor(params: ReservationModel){
        this.id = params.id;
        this.price = params.price;
        this.propertyId = params.propertyId;
        this.numberOfPeople = params.numberOfPeople;
        this.startDate = params.startDate;
        this.endDate = params.endDate;
        this.reservationStatus = params.reservationStatus;
      }
}

export class ReservationCheck{
    reservationFree:boolean;

    constructor(params: ReservationCheck){
        this.reservationFree = params.reservationFree;
    }
}

export enum ReservationStatus {
    PENDING,
    SUCCESSFUL,
    CANCELED
}
