export interface SiteVisit{
    siteVisitName: string;
    siteVisitId: number;
    scheduledDate: Date;
    assignedTeamId: number;
    assignedVehicle: string;
    startSiteVisit: boolean;
    dateRange: Date;
    state:string;
    completedSiteVisits: number;
}