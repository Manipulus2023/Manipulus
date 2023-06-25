import { Customer } from "../customer/customer";
import { Locations } from "../location/locations";

export class Job{
    id!: number;  //
    job_type!: string; //
    job_date!: Date; //
    job_status!: String; //
    jobCode!: String; //
    customer!:Customer;
    customer_id!: number;
    location:Locations; //
    type: any;
}

export class NewJob{
    job_type!: string; //
    job_date!: Date; //
}