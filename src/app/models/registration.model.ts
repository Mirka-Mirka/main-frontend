import { UserRole } from "./user.model";

export class RegistrationModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  role?: UserRole;
  pib?: string;
  city?: string;
  street?: string;
  country?: string;
  latitude?: string;
  longitude?: string;

  constructor(params: RegistrationModel){
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.email = params.email;
    this.password = params.password;
    this.username = params.username;
    this.role = params.role;
    this.pib = params.pib;
    this.city = params.city;
    this.street = params.street;
    this.country = params.country;
    this.latitude = params.latitude;
    this.longitude = params.longitude;
  }
}
