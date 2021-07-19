export class AddressModel{
    public city: string;
    public country: string;
    public street: string; 
    public latitude: number;
    public longitude: number;

    constructor(params: AddressModel){
        this.city = params.city;
        this.country = params.country;
        this.street = params.street;
        this.latitude = params.latitude;
        this.longitude = params.longitude;
    }

}