import { scheduled } from "rxjs";

export interface SiteVisit{
    siteVisitName: string;
    siteVisitId: number;
    scheduledDate: Date;
    assignedTeamId: number;
    assignedVehicle: string;
    startSiteVisit: boolean;
    dateRange: Date;
    state:string;
    
    
}