package com.Manipulus.arctic.siteVisit.siteVisit;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "site_visit")
public class SiteVisit implements Serializable {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(nullable = false,updatable = false)
        private Long siteVisitId;
    @Column(name = "scheduledDate" )
        private Date scheduledDate;
    @Column(name = "assignedTeamId" )
        private Long assignedTeamId;
    @Column(name = "assignedVehicle" )
        private String assignedVehicle;
    @Column(name = "startSiteVisit" )
        private boolean startSiteVisit;
    @Column(name = "dateRange" )
        private Date dateRange;
    @Column(name = "state" )
        private String state;

    @Column(nullable = false, updatable = false)
    private String siteVisitCode;
    public String getSiteVisitCode() {
        return siteVisitCode;
    }

    public void setSiteVisitCode(String siteVisitCode) {
        this.siteVisitCode = siteVisitCode;
    }

    public  SiteVisit(){}

        public SiteVisit(Date scheduledDate, Long assignedTeamId, String assignedVehicle, boolean startSiteVisit, Date dateRange, String state, String siteVisitCode){
            this.scheduledDate=scheduledDate;
            this.assignedTeamId=assignedTeamId;
            this.startSiteVisit=startSiteVisit;
            this.dateRange=dateRange;
            this.state=state;
            this.assignedVehicle=assignedVehicle;
            this.siteVisitCode=siteVisitCode;
        }

        public Long getSiteVisitId(){
            return siteVisitId;
        }
        public  void setSiteVisitId(long siteVisitId){
            this.siteVisitId=siteVisitId;
        }

        public String getAssignedVehicle(){
            return  assignedVehicle;
        }
        public void setAssignedVehicle(String assignedVehicle){
            this.assignedVehicle=assignedVehicle;
        }

        public Long getAssignedTeamId(){
            return  assignedTeamId;
        }
        public void setAssignedTeamId(long assignedTeamId){
            this.assignedTeamId=assignedTeamId;
        }

        public boolean getStartSiteVisit(){
            return  startSiteVisit;
        }
        public void setStartSiteVisit(boolean startSiteVisit){
            this.startSiteVisit=startSiteVisit;
        }

        public Date getScheduledDate(){
            return  scheduledDate;
        }
        public void setScheduledDate(Date scheduledDate){
            this.scheduledDate=scheduledDate;
        }

        public Date getDateRange(){
            return  dateRange;
        }
        public void setDateRange(Date dateRange){
            this.dateRange=dateRange;
        }

        public String getState(){
            return  state;
        }
        public void setState(String state){
            this.state=state;
        }



        @Override
        public String toString(){
            return "SiteVisit{" +
                    "SiteVisitId="+ siteVisitId+'\''+
                    ", ScheduledDate"+ scheduledDate+'\''+
                    ", AssignedTeamId"+assignedTeamId+'\''+
                    ", AssignedVehicle"+ assignedVehicle+'\''+
                    ", startSiteVisit "+ startSiteVisit+'\''+
                    ", DateRange "+ dateRange+'\''+
                    ", state" +state+'\''+

                    '}';
        }


}
