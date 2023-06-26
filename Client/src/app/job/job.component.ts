import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, firstValueFrom } from 'rxjs';
import { Job, NewJob,  } from './job';
import { JobService } from './job.service';
import { Customer } from '../customer/customer';
import { Locations } from '../location/locations';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { locationService } from './../location/location.service';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit {
  lastClickedLat:number | undefined;
  lastClickedLng: number | undefined;
  public jobs: Job[] = [];
  public editJob: Job | undefined;
  public deleteJob!: Job;
  public  map_job: Job;
  dtoptions: DataTables.Settings = {};
  dtTriger: Subject<any> = new Subject<any>();
  public customers!: Customer;
  public locations: Number[] = [];

  public customersList: Customer[] = [];

  public locationList: Locations[] = [];
  public customer_locationList: Locations[] = [];
  public customer_location: Locations;

  public customerId!: number;
  public locationId!: number;

  public EditcustomerId!: number;
  public selectedJobType!: string;
  public location!: Locations;
  public job_count!: number;
  public last_job_id!: number;
  currentPage: number = 1; 
 
  constructor(private jobService: JobService) {
    this.lastClickedLat = undefined;
    this.lastClickedLng = undefined;
  }

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      destroy: true,
    };

    this.getCustomers();
    this.getJobs();
    console.log(this.customersList , "all cuso");
  
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }


  title = 'angular-google-maps-app';

  @ViewChild('myGoogleMap', { static: false })
  map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false })
  info!: MapInfoWindow;

  zoom = 9;
  maxZoom = 15;
  minZoom = 2;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom:this.maxZoom,
    minZoom:this.minZoom,
  }
 
  
  markers = {
    position: {
      lat:-10.5003747,
      lng: -10.5003747
    },
    label: {
      color: "blue",
      fontWeight :'bold',
      text: "Marker label 2"
    },
    title: "",
    info: "",
    options: {
      animation: 2
    }
  }  as  any;

  infoContent = ''

  eventHandler(event: any ,name:string){
    console.log(event,name);
    
    // Add marker on double click event
    if(name === 'mapClick'){
     
    }
  }
  dropMarker(event: any) {
    console.log('dropMarker', event)
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
  
    this.markers.push({
      position: {
        lat: lat,
        lng: lng,
      },
      label: {
        color: 'blue',
        fontWeight: 'bold',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.DROP,
      },
    });
    console.log('dropMarker lat', lat)
    this.lastClickedLat = lat;
    this.lastClickedLng = lng;
    console.log(this.lastClickedLat);

  }


  openInfo(marker: MapMarker, content: string) {
    this.infoContent = content;
    this.info.open(marker)
  }



  public getCustomers(): void {
    {
      this.jobService.getCustomerList().subscribe(
        (response: Customer[]) => {
          this.customersList = response.filter(
            (customer) => customer.active_status
          );
          console.log(this.customersList) ;
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
    }
  }


  onClickNext() {
    // Handle logic when the "Next" button is clicked on the first page
    // You can add your custom code here
    // For example:
    console.log('Next button clicked');
  }

  nextPage1(customerId: number) {
    this.onClickNext(); // Call the custom function before moving to the next page
    this.currentPage = 2; 
    console.log('Next button clicked' , this.customerId);

    this.jobService.findLocationByCustomerId(customerId).subscribe(
      (response: Number[]) => {
        this.locations = response;
        console.log(this.locations);
        console.log(this.locations[1] ,"firste" );
        for (let i = 0; i < this.locations.length; i++) {
          this.jobService.findLocationById(this.locations[i]).subscribe(
            (response: Locations) => {
              this.customer_location = response;
              console.log(this.customer_location);
              this.customer_locationList.push(this.customer_location);
            },
            (error: HttpErrorResponse) => alert(error.message)
          );
        }

      },
      (error: HttpErrorResponse) => alert(error.message)
    );

    console.log('Next button clicked locations' , this.locations);

    
    

    console.log(this.customer_locationList, 'customerlocation_List');

    // Move to the next page
  }

  nextPage2(){
    this.currentPage = 3; 
    console.log('Next button clicked' , this.locationId);

  }



  previousPage() {
    this.currentPage = 1; // Move to the previous page
  }

 

  public getLocations(): void {
    {
      this.jobService.getlocationlist().subscribe(
        (response: Locations[]) => {
          this.locationList = response;
          console.log(this.locationList);
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
    }
  }

  public findLocationByCustomerId(customerId: number): void {
    {
      this.jobService.findLocationByCustomerId(customerId).subscribe(
        (response: Number[]) => {
          this.locations = response;

          console.log(this.locations);
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
    }
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

  onclick(){
    console.log(this.locationId)
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


 submitForm1(form: NgForm) {
  console.log(form.value);

  const jobData: NewJob = {
    job_date: form.value.job_date,
    job_type: form.value.job_type
  };

  // console.log("locationData", jobData, "locationData");
  console.log("locationID", this.locationId, "locationID");
  this.jobService.addJob(jobData,this.locationId).subscribe(
    (response: NewJob) => {
      console.log(response);
      // Perform any additional actions after successfully adding the location
    },
    (error: HttpErrorResponse) => {
      console.error(error);
      // Handle any errors that occur during the request
    }
  );

  // Reset the form after submission if needed
  form.reset();
  this.reload();
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
    if (mode === 'map') {
      button.setAttribute('data-bs-target', '#exampleModal_map');
      this.map_job = job;
      this.markers={
        position: {
          lat: job.location.location_lat,
          lng: job.location.location_lng,
        },
        label: {
          color: 'blue',
          fontWeight: 'bold',
          text: 'Marker label ' + (this.markers.length + 1),
        },
        title: job.job_type ,
        info: (job.job_type)+' job @ Customer ' + (job.location.location_customer.name)  +' Contact Number: ' +(job.location.location_customer.contactNumber),
        options: {
          animation: google.maps.Animation.DROP,
        },
      };
    }
    container.appendChild(button);
    button.click();
  }
}
