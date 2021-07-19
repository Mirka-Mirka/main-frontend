import { AddressModel } from "./address.model";

export class AccommodationModel{
    public id: number;
    public name: string;
    public description: string;
    public category: string;
    public stars: number;
    public numberOfPeople: number;
    public numberOfCancellationDays: number;
    public price: number;
    public type: string;
    public address: AddressModel;
    public agentId: string;
    public createdAt: Date;
    public propertyServices: string[];
    public imageUrls: string[];

    constructor(params: AccommodationModel){
       this.id = params.id;
       this.name = params.name;
       this.description = params.description;
       this.category = params.category;
       this.stars = params.stars;
       this.numberOfPeople = params.numberOfPeople;
       this.numberOfCancellationDays = params.numberOfCancellationDays;
       this.price = params.price;
       this.type = params.type;
       this.address = params.address;
       this.agentId = params.agentId;
       this.createdAt = params.createdAt;
       this.propertyServices = params.propertyServices;
       this.imageUrls = params.imageUrls;
    }
}