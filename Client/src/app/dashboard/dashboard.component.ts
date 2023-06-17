import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/customer';
import { HttpErrorResponse } from '@angular/common/http';
import { JobService } from '../job/job.service';
import { Job } from '../job/job';
import { NgForm } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
    '.../../../../assets/Css/nucleo-icons.css',
  ],
})
export class DashboardComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartType: ChartType = 'pie';
  public jobTypes: string[];
  public jobCounts: number[];
  public barChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 3, // Adjust the aspect ratio as desired
    indexAxis: 'y', // Set the index axis to 'y' for horizontal bar graph
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset[] = [];
  public customers: Customer[] = [];
  public customersList: Customer[] = [];
  public jobs: Job[] = [];
  lastTwelveCustomers: Customer[];
  lastFiveJobs: Job[];
  constructor(
    private customerService: CustomerService,
    private jobService: JobService
  ) {}
  public InstallationfilteredJobs: Job[] = [];
  public BreakdownsfilteredJobs: Job[] = [];
  public customerId!: number;
  public jobstypes: String[] = [
    'Inspection',
    'Service',
    'Installation',
    'Breakdowns',
    'Upgrades',
    'Remove',
  ];
  addForm: NgForm;
  ngOnInit(): void {
    this.getCustomers();
    this.getJobs();

   
  }

  public getCustomers(): void {
    {
      this.customerService.getCustomerList().subscribe(
        (response: Customer[]) => {
          this.customers = response;
          this.customersList = response.filter(
            (customer) => customer.active_status
          );
          console.log('this.customersList');
          console.log(this.customers);

          // Store the last twelve values in descending order
          const lastIndex = this.customers.length - 1;
          const startIndex = Math.max(0, lastIndex - 11);
          this.lastTwelveCustomers = this.customers
            .slice(startIndex, lastIndex + 1)
            .sort((a, b) => b.id - a.id);
          console.log(this.lastTwelveCustomers);
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
    }
  }

  public getJobs(): void {
    this.jobService.getJobList().subscribe(
      (response: Job[]) => {
        this.jobs = response;

        // Store the last five jobs in ascending order
        const lastIndex = this.jobs.length - 1;
        const startIndex = Math.max(0, lastIndex - 3);
        this.lastFiveJobs = this.jobs
          .slice(startIndex, lastIndex + 1)
          .sort((a, b) => a.id - b.id);
        console.log(this.lastFiveJobs);


        this.InstallationfilteredJobs = this.jobs.filter(
          (job) => job.job_type == 'Service'
        );
        this.BreakdownsfilteredJobs = this.jobs.filter(
          (job) => job.job_type == 'Breakdowns'
        );
        console.log(this.BreakdownsfilteredJobs);

        // Calculate job counts by type
        const counts: { [type: string]: number } = {};

        this.jobs.forEach((job: Job) => {
          if (counts[job.job_type]) {
            counts[job.job_type]++;
          } else {
            counts[job.job_type] = 1;
          }
        });


        // Extract types and counts into separate arrays
        this.jobTypes = Object.keys(counts);
        this.jobCounts = Object.values(counts);

        // Define the common color for bars and hover colors
        const barColor = 'rgba(54, 162, 235, 0.6)';
        const hoverColor = 'rgba(50, 78, 168, 0.6)';

        // Create an array with the same length as the number of bars
        const barColors = Array(this.jobTypes.length).fill(barColor);
        const hoverColors = Array(this.jobTypes.length).fill(hoverColor);

        // Update chart data with the common color and hover color arrays
        this.barChartLabels = this.jobTypes;
        this.barChartData = [
          {
            data: this.jobCounts,
            label: 'Job Count',
            backgroundColor: barColors,
            hoverBackgroundColor: hoverColors,
          },
        ];
      },
      (error: HttpErrorResponse) => alert(error.message)
    );
  }

  public onAddCustomer(addForm: NgForm): void {
    this.customerService.addCustomer(addForm.value).subscribe(
      (response: Customer) => {
        console.log(response);
        this.getCustomers();
        addForm.reset();
        // window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
