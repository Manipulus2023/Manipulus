import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, firstValueFrom } from 'rxjs';
import { Job } from './job';
import { JobService } from './job.service';
import { Customer } from '../customer/customer';
import { Locations } from '../location/locations';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit {
  public jobs: Job[] = [];
  public editJob: Job | undefined;
  public deleteJob!: Job;
  dtoptions: DataTables.Settings = {};
  dtTriger: Subject<any> = new Subject<any>();
  public customers!: Customer;
  public customersList: Customer[] = [];
  public customerId!: number;
  public EditcustomerId!: number;
  public selectedJobType!: string;
  public location!: Locations;
  public job_count!: number;
  public last_job_id!: number;
  constructor(private jobService: JobService) {}


  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      destroy: true,
    };
    this.getJobs();
    this.getCustomers();
  }

  public findCustomerById(customerId: number): void {
    {
      this.jobService.findCustomerById(customerId).subscribe(
        (response: Customer) => {
          this.customers = response;
          console.log(this.customers);
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
    }
  }

  public getCustomers(): void {
    {
      this.jobService.getCustomerList().subscribe(
        (response: Customer[]) => {
          this.customersList = response.filter(
            (customer) => customer.active_status
          );
          // console.log(this.customersList);
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
    }
  }

  public getJobs(): void {
    {
      this.jobService.getJobList().subscribe(
        (response: Job[]) => {
          this.jobs = response;
          console.log(this.jobs);
          this.job_count = this.jobs.length;
          if(this.jobs.length===0){
            this.last_job_id=1;
          }else{
            this.last_job_id = this.jobs[this.job_count - 1].id + 1;

          }
          
          console.log(this.last_job_id);
          this.dtTriger.next(null);
          console.log(this.jobs);
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
    }
  }

  public onAddJob(addForm: NgForm): void {
 
    this.getCustomers();


    const job: Job = {
      id: 0,
      job_type: addForm.value.job_type,
      job_date: addForm.value.job_date,
      job_status: '',
      jobCode: '',
      //@ts-ignore
      customer: Customer,

      customer_id: addForm.value.customer_id,
      location: addForm.value.location,
    };
    console.log('before adding job',this.jobs);
    const customerId: number = this.customerId;
    firstValueFrom(this.jobService.addJob(addForm.value, customerId))
    .then((job: Job) => {
        console.log(location);
       
        const jobID = this.last_job_id;
        console.log(this.last_job_id);
        this.getJobs(); 

        // const customerId: number = 5; // Set the desired customer ID here
        firstValueFrom(this.jobService.addlocation(job, jobID)).then((location: Locations) => {
            console.log('after adding job',this.jobs);
            this.getJobs();
            this.dtoptions = {
              retrieve: true,
            };
            addForm.reset();
          }).catch((error: HttpErrorResponse) => {
            alert(error.message);
          });
      })
      .catch((error: any) => {
        alert(error.message);
      });
  }
public reload(): void {
  window.location.reload();
}
  public onDeleteJob(jobID: number): void {
    this.jobService.deleteJob(jobID).subscribe(
      (response: void) => {
        console.log(response);
        this.getJobs();
        this.dtoptions = {
          retrieve: true,
        };
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateJob(job: Job): void {
    this.getCustomers();
    const EditcustomerId: number = this.EditcustomerId;
    job.job_type = this.selectedJobType; // Assign the selected job type
    this.jobService.updateJob(job, EditcustomerId).subscribe(
      (response: Job) => {
        console.log(response);
        this.getJobs();
        this.dtoptions = {
          retrieve: true,
        };
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(job: Job, mode: string): void {
    const container = document.getElementById(
      'main-container'
    ) as HTMLInputElement;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'edit') {
      button.setAttribute('data-bs-target', '#exampleModal2');
      this.editJob = job;
    }

    if (mode === 'delete') {
      button.setAttribute('data-bs-target', '#exampleModal3');
      this.deleteJob = job;
    }
    container.appendChild(button);
    button.click();
  }
}
