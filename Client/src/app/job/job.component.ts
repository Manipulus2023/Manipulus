import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Job } from './job';
import { JobService } from './job.service';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  public jobs : Job[] =[];
  public editJob: Job | undefined;
  public deleteJob!: Job;
  dtoptions:DataTables.Settings={}
  dtTriger:Subject<any>=new Subject<any>();

  constructor(private jobService: JobService) { }

  ngOnInit(): void {

    this.dtoptions={
      pagingType: 'full_numbers',
      destroy: true,
      
    };
    this.getJobs();
  }


  public getJobs():void { {
    this.jobService.getJobList().subscribe(
      (response: Job[]) =>{
        this.jobs = response;
        this.dtTriger.next(null);
        console.log(this.jobs);
      },
      (error: HttpErrorResponse) =>
         alert(error.message)
        
      ); }}


      public onAddJob(addForm: NgForm):void{
        
        (document.getElementById("add-job-form") as HTMLInputElement).click();
       this.jobService.addJob(addForm.value).subscribe(
         (response: Job)=> {
           console.log(response);
           this.getJobs();
           this.dtoptions={
             retrieve: true,
           };
          
           addForm.reset();
         },
         (error: HttpErrorResponse) =>  {
           alert(error.message);

         } 
       );
     }


     public onDeleteJob(jobID: number):void{
        
      this.jobService.deleteJob(jobID).subscribe(
        (response: void)=> {
          console.log(response);
          this.getJobs();
          this.dtoptions={
           retrieve: true,
         };
         
        },
        (error: HttpErrorResponse) =>  {
          alert(error.message);

        } 
      );
    }

    public onUpdateJob(Job: Job):void{
        
      this.jobService.updateJob(Job).subscribe(
        (response: Job)=> {
          console.log(response);
          this.getJobs();
          this.dtoptions={
           retrieve: true,
         };
        },
        (error: HttpErrorResponse) =>  {
          alert(error.message);

        } 
      );
    }
     

    public onOpenModal(job:Job, mode:string):void {
      const container = (document.getElementById('main-container') as HTMLInputElement);
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-bs-toggle','modal');
        if(mode === 'edit'){
          button.setAttribute('data-bs-target','#exampleModal2');
          this.editJob = job;
        }
        if(mode === 'delete'){
          button.setAttribute('data-bs-target','#exampleModal3');
          this.deleteJob = job;
        }
        container.appendChild(button);
        button.click();
    }
}
