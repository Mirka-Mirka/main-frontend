export class MapModel {
    centerLat: number;
    centerLong: number;
    iconUrl: string;
    title: string;
    label: string;
    link: string;

    constructor(lat: number, long: number, icon: string, title:string, label:string, link: string){
        this.iconUrl = icon;
        this.title = title;
        this.label = label;
        this.centerLat = lat;
        this.centerLong = long;
        this.link = link;
    }
} 