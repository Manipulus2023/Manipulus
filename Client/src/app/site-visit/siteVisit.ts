import { scheduled } from "rxjs";

export interface SiteVisit{
    siteVisitName: string;
    siteVisitId: number;
    scheduledDate: Date;
    teamDetails: String;
    assignedVehicle: string;
    startSiteVisit: boolean;
    dateRange: Date;
    state:string;
    
    
}