import { scheduled } from "rxjs";
import { Vehicle } from "../vehicle/vehicle";

export interface SiteVisit{
   
    //vehicle: import("c:/Manipulus 7.0/Manipulus/Client/src/app/vehicle/vehicle").Vehicle;
    siteVisitName: string;
    siteVisitId: number;
    scheduledDate: Date;
    assignedTeamId: number;
    assignedVehicle: string;
    startSiteVisit: boolean;
    dateRange: Date;
    state:string;
    vehicles: Vehicle[];
    
    
}

export { Vehicle };
