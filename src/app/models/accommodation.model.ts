export class AccommodationModel{
    public id: number;
    public name: string;

    constructor(params: AccommodationModel){
       this.id = params.id;
       this.name = params.name;
    }
}