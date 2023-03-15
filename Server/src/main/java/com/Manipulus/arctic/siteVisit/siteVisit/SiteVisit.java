package com.Manipulus.arctic.siteVisit.siteVisit;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
public class SiteVisit implements Serializable {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(nullable = false,updatable = false)
        private Long siteVisitId;
        private Date scheduledDate;
        private Long assignedTeamId;
        private String assignedVehicle;
        private boolean startSiteVisit;
        private Date dateRange;
        private String state;


        public  SiteVisit(){}

        public SiteVisit(Date scheduledDate, Long assignedTeamId, String assignedVehicle, boolean startSiteVisit, Date dateRange, String state ){
            this.scheduledDate=scheduledDate;
            this.assignedTeamId=assignedTeamId;
            this.startSiteVisit=startSiteVisit;
            this.dateRange=dateRange;
            this.state=state;
            this.assignedVehicle=assignedVehicle;

        }

        public Long getSiteVisitI(){
            return siteVisitId;
        }
        public  void setSiteVisitId(){
            this.siteVisitId=siteVisitId;
        }

        public String getAssignedVehicle(){
            return  assignedVehicle;
        }
        public void setAssignedVehicle(){
            this.assignedVehicle=assignedVehicle;
        }

        public Long getAssignedTeamId(){
            return  assignedTeamId;
        }
        public void setAssignedTeamId(){
            this.assignedTeamId=assignedTeamId;
        }

        public boolean getStartSiteVisit(){
            return  startSiteVisit;
        }
        public void setStartSiteVisit(){
            this.startSiteVisit=startSiteVisit;
        }

        public Date getScheduledDate(){
            return  scheduledDate;
        }
        public void setScheduledDate(){
            this.scheduledDate=scheduledDate;
        }

        public Date getDateRange(){
            return  dateRange;
        }
        public void setDateRange(){
            this.dateRange=dateRange;
        }

        public String getState(){
            return  state;
        }
        public void setState(){
            this.state=state;
        }


        @Override
        public String toString(){
            return "SiteVisit{" +
                    "Site Visit Id="+ siteVisitId+'\''+
                    ", Scheduled Date"+ scheduledDate+'\''+
                    ", Assigned Team Id"+assignedTeamId+'\''+
                    ", Assigned Vehicle"+ assignedVehicle+'\''+
                    ", startSiteVisit "+ startSiteVisit+'\''+
                    ", Date Range "+ dateRange+'\''+
                    ", state" +state+'\''+

                    '}';
        }


}
