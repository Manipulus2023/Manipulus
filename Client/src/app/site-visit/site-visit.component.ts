import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SiteVisitService } from './site-visit.service';
import { SiteVisit } from './siteVisit';
import { NgForm } from '@angular/forms';
import { Vehicle } from '../vehicle/vehicle';
import { VehicleServise } from '../vehicle/vehicle.service';
import { ActivatedRoute } from '@angular/router';
import { scheduled } from 'rxjs';

@Component({
  selector: 'app-site-visit',
  templateUrl: './site-visit.component.html',
  styleUrls: ['./site-visit.component.css']
})
export class SiteVisitComponent implements OnInit {
 
  
  public siteVisits: SiteVisit[] ;
  public editSiteVisits: SiteVisit |null= null;
  public deleteSiteVisits: any;
  public completedSiteVisitsCount: number = 0;
  public incompleteSiteVisitsCount: number = 0;
  public totalSiteVisitsCount: number = 0;
  // public assignVehicle: Vehicle | null = null;
  // public vehicles: Vehicle[] = [];
  // Add a new property for the available vehicles
  //vehicleService: any;
  availableVehicles: Vehicle[] = [];
  selectedVehicle: Vehicle | null = null;
  public state: string | undefined;

  //siteVisit: any;
  constructor(private siteVisitService : SiteVisitService,private route: ActivatedRoute) {
    this.siteVisits=[];
    
   }



  ngOnInit(): void {
    
    
    this.getSiteVisit();
    this.getAvailableVehicles();
  }
  getAvailableVehicles() {
    this.siteVisitService.getAvailableVehicles().subscribe((vehicles: Vehicle[]) => {
      this.availableVehicles = vehicles;
    });

  }
  getSiteVisit(): void {
    const siteVisitId = this.route.snapshot.paramMap.get('siteVisitId');
    this.siteVisitService.getSiteVisits().subscribe(siteVisits => { // fetches all site visits
      this.siteVisits = siteVisits;
      this.completedSiteVisitsCount = this.countCompletedSiteVisits(siteVisits);
      this.incompleteSiteVisitsCount = this.countIncompleteSiteVisits(siteVisits);
      this.totalSiteVisitsCount = siteVisits.length;
    });
    
  }

  //Assign Vehicle
  assignVehicle(): void {
    if (this.selectedVehicle) {
      this.siteVisits[0].vehicles.push(this.selectedVehicle);

      this.selectedVehicle = null;
    }
  }

//count completed site Visits
  countCompletedSiteVisits(siteVisits: SiteVisit[]): number {
    let completedSiteVisitsCount = 0;
      for (let siteVisit of siteVisits) {
        if (siteVisit.state === 'completed') {
          completedSiteVisitsCount++;
        }
      }
    return completedSiteVisitsCount;
  }

  //count incompleted site Visits
  countIncompleteSiteVisits(siteVisits: SiteVisit[]): number {
    let incompleteSiteVisitsCount = 0;
      for (let siteVisit of siteVisits) {
        if (siteVisit.state !== 'completed') {
          incompleteSiteVisitsCount++;
        }
      }
    return incompleteSiteVisitsCount;
  }
  
  //get all the site Visits
  public getSiteVisits():void{
    this.siteVisitService.getSiteVisits().subscribe(
      (response: SiteVisit[])=>{
        this.siteVisits=response;
        console.log(this.siteVisits)
      },
      (
        error: HttpErrorResponse)=>{
          alert(error.message);
        }
        );
  }

  //add a new site visit
  public onAddSiteVisit(addForm: NgForm): void {
    document.getElementById('add-siteVisit-form')?.click();
    
    const assignedVehicle = addForm.value.assignedVehicle;
    const state = addForm.value.state;
  
    // Check if the vehicle number already exists in the site visits
    const existingVehicle = this.availableVehicles.find(sv => sv.vehicle_number === assignedVehicle);
    if (existingVehicle) {
      // Update the active_state of the existing vehicle
      const vehicleToUpdate = existingVehicle;
      
      if (vehicleToUpdate) {
         const assignedStatus = state !== 'Completed' ? 'Assigned' : 'Available';
        let activeState = assignedStatus;
        let preActiveState = activeState;
        if (assignedStatus === 'Assigned') {
          activeState += ` (FROM: ${addForm.value.scheduledDate}, TO: ${addForm.value.dateRange})`;
          vehicleToUpdate.active_state = activeState;
        }else{
          vehicleToUpdate.active_state = vehicleToUpdate.active_state;
        }
      }
      
      
      this.siteVisitService.updateVehicles(existingVehicle).subscribe(
        (response: Vehicle) => {
          console.log(response);
          this.getSiteVisits();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );

      const siteVisit: SiteVisit = {
        scheduledDate: addForm.value.scheduledDate,
        assignedTeamId: addForm.value.assignedTeamId,
        assignedVehicle: assignedVehicle,
        startSiteVisit: false,
        dateRange: addForm.value.dateRange,
        state: state,
        vehicles: [],
        siteVisitName: '',
        siteVisitId: 0
      };
      
      this.siteVisitService.addSiteVisit(siteVisit).subscribe(
        (response: SiteVisit) => {
          console.log(response);
          this.getSiteVisits();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );
    } else {
      alert('Vehicle number already exists in a site visit. Please select a different vehicle number.');
      return;
      };
      
  }
  
   //Edit asite visit
  public onUpdateSiteVisit(siteVisit: SiteVisit): void {
    // const assignedVehicle = siteVisit.assignedVehicle;
    // const state = siteVisit.state;
  
    // // Check if the vehicle number already exists in the site visits
    // const existingVehicle = this.availableVehicles.find(sv => sv.vehicle_number === assignedVehicle);
    // if (existingVehicle) {
    //   // Update the active_state of the existing vehicle
    //   const vehicleToUpdate = existingVehicle;
      
    //   if (vehicleToUpdate) {
    //      const assignedStatus = state !== 'Completed' ? 'Assigned' : 'Available';
    //     let activeState = assignedStatus;
    //     let preActiveState = activeState;
    //     if (assignedStatus === 'Assigned') {
    //       activeState += ` (FROM: ${siteVisit.scheduledDate}, TO: ${siteVisit.dateRange})`;
    //       vehicleToUpdate.active_state = activeState;
    //     }else if (assignedStatus === 'Available') {
    //       const dateSetToRemove = `(FROM: ${siteVisit.scheduledDate}, TO: ${siteVisit.dateRange})`;
    //       const updatedActiveState = vehicleToUpdate.active_state.replace(dateSetToRemove, '');
    //       vehicleToUpdate.active_state=updatedActiveState;
    //       // vehicleToUpdate.active_state=vehicleToUpdate.active_state.replace(` (FROM: ${siteVisit.scheduledDate}, TO: ${siteVisit.dateRange})`, '');
      
  
    //     }else{
          

    //       vehicleToUpdate.active_state = vehicleToUpdate.active_state;
    //     }
    //   }
      
      
      // this.siteVisitService.updateVehicles(existingVehicle).subscribe(
      //   (response: Vehicle) => {
      //     console.log(response);
      //     this.getSiteVisits();
      //     addForm.reset();
      //   },
      //   (error: HttpErrorResponse) => {
      //     alert(error.message);
      //     addForm.reset();
      //   }
      // );

      // const existingVehicle = this.availableVehicles.find(sv => sv.vehicle_number === siteVisit.assignedVehicle);
      // this.siteVisitService.updateVehicles(existingVehicle).subscribe(
      //   (response: Vehicle) => {
      //     console.log(response);
      //     this.getAvailableVehicles();
          
        
      //   },
      //   (error: HttpErrorResponse) => {
      //     alert(error.message);
      //   }
      // );
    
   
  
    this.siteVisitService.updateSiteVisit(siteVisit).subscribe(
      (response: SiteVisit) => {
        console.log(response);
        this.getSiteVisits();
        
      
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
// }

   //Delete a site visit
  public onDeleteSiteVisit(siteVisitId: number): void {
    this.siteVisitService.deleteSiteVisit(siteVisitId).subscribe(
      (response: void) => {
        console.log(response);
        this.getSiteVisits();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

   //Search a site visit
  public searchSiteVisits(key: string): void {
    console.log(key);
    const results: SiteVisit[] = [];
    for (const siteVisit of this.siteVisits) {
      if (siteVisit &&  siteVisit.siteVisitId && siteVisit.siteVisitId.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(siteVisit);
      }
    }
    this.siteVisits = results;
    if (results.length === 0 || !key) {
      this.getSiteVisits();
    }
  }
  

  public onOpenModal(siteVisit: SiteVisit | null,mode:string): void{ //takes a SiteVisit object and a mode as parameters. It opens a modal window based on the mode passed in as a parameter.
    const container=document.getElementById('main-container');
    const button = document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode ==='add'){
      button.setAttribute('data-target','#addSiteVisitModal');
      
    }
    if(mode ==='edit'){
      
      this.editSiteVisits=siteVisit;
      button.setAttribute('data-target','#updateSiteVisitModal');
    }
    if(mode ==='delete'){
      this.deleteSiteVisits = siteVisit;
     
      button.setAttribute('data-target','#deleteSiteVisitModal');
    }
     
    container?.appendChild(button);
    button.click();

  }
  
}


