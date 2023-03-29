package com.Manipulus.arctic.job.model;


import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "job")
public class Job implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false,updatable = false)
    private long id;

    @Column(name = "job_type" )
    private String job_type;

    @Column(name = "job_date")
    private Date job_date;

    @Column(name = "job_status")
    private String job_status;

    @Column(nullable = false,updatable = false)
    private String jobCode;

    public String getJobCode() {
        return jobCode;
    }

    public void setJobCode(String customerCode) {
        this.jobCode = customerCode;
    }

    public Job(){

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getJob_type() {
        return job_type;
    }

    public void setJob_type(String job_type) {
        this.job_type = job_type;
    }

    public Date getJob_date() {
        return job_date;
    }

    public void setJob_date(Date job_date) {
        this.job_date = job_date;
    }

    public String getJob_status() {
        return job_status;
    }

    public void setJob_status(String job_status) {
        this.job_status = job_status;
    }

    public Job(String job_type, Date job_date, String job_status, String jobCode) {
        this.job_type = job_type;
        this.job_date = job_date;
        this.job_status = job_status;
        this.jobCode = jobCode;
    }

    @Override
    public String toString(){
        return "Customer{" +
                "id=" + id +
                "job_type=" + job_type +
                "job_date=" +job_date +
                "job_status=" +job_status +
               '}';

    }


}

