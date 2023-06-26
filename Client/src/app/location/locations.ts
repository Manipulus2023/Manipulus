import { Customer } from "../customer/customer";
export class Locations {
  id!: number;
  location_lat: number;
  location_lng: number;
  location_customer: Customer;
  customer_id!: number;
  location_title:string;
}

export class NewLocation{
  location_lat: number;
  location_lng: number;
  location_title: string;
}