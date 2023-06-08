package com.Manipulus.arctic.siteVisit.siteVisit;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.io.Serializable;
import java.util.Date;

@Data
@DynamicUpdate
@DynamicInsert
@Entity
@Table(name = "site_visit")
public class SiteVisit implements Serializable {
    private static final long serialVersionID=1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="siteVisitId" )
    private Integer siteVisitId;

    @Column(name = "uuid")
    private String uuid;
    @Column(name = "jobDetails", columnDefinition = "json"  )
    private String jobDetails;
    @Column(name = "scheduledDate" )
    private Date scheduledDate;
    @Column(name = "teamDetails", columnDefinition = "json" )
    private String teamDetails;
    @Column(name = "assignedVehicle", columnDefinition = "json")
    private String assignedVehicle;
    @Column(name = "startSiteVisit" )
    private boolean startSiteVisit;
    @Column(name = "dateRange" )
    private Date dateRange;
    @Column(name = "state" )
    private String state;

    @Column(nullable = false, updatable = false)
    private String siteVisitCode;

//-------------------------------------------------------------
   /* public String getSiteVisitCode() {
        return siteVisitCode;
    }

    public void setSiteVisitCode(String siteVisitCode) {
        this.siteVisitCode = siteVisitCode;
    }

    public  SiteVisit(){}

        public SiteVisit(Date scheduledDate, String teamDetails, String assignedVehicle, boolean startSiteVisit, Date dateRange, String state, String siteVisitCode,String jobName){
            this.scheduledDate=scheduledDate;
            this.teamDetails=teamDetails;
            this.startSiteVisit=startSiteVisit;
            this.dateRange=dateRange;
            this.state=state;
            this.assignedVehicle=assignedVehicle;
            this.siteVisitCode=siteVisitCode;
            this.jobDetails=jobDetails;
        }

        public Integer getSiteVisitId(){
            return siteVisitId;
        }
        public  void setSiteVisitId(Integer siteVisitId){
            this.siteVisitId=siteVisitId;
        }

        public String getAssignedVehicle(){
            return  assignedVehicle;
        }
        public void setAssignedVehicle(String assignedVehicle){
            this.assignedVehicle=assignedVehicle;
        }

        public String getTeamDetails(){
            return  teamDetails;
        }
        public void setTeamDetails(String teamDetails){
            this.teamDetails=teamDetails;
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

        public String getJobDetails(){
            return  jobDetails;
        }
        public void setJobDetails(String jobDetails){
            this.jobDetails=jobDetails;
        }

        @Override
        public String toString(){
            return "SiteVisit{" +
                    "SiteVisitId="+ siteVisitId+'\''+
                    ", ScheduledDate"+ scheduledDate+'\''+
                    ", AssignedTeamId"+teamDetails+'\''+
                    ", AssignedVehicle"+ assignedVehicle+'\''+
                    ", startSiteVisit "+ startSiteVisit+'\''+
                    ", DateRange "+ dateRange+'\''+
                    ", state" +state+'\''+
                    ", JobDetails" +jobDetails+'\''+

                    '}';
        }

*/

}
