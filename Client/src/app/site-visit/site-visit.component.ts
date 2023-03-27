import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SiteVisitService } from './site-visit.service';
import { SiteVisit } from './siteVisit';
import { NgForm } from '@angular/forms';

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
  

  constructor(private siteVisitService : SiteVisitService) {
    this.siteVisits=[];
    
   }


  ngOnInit(): void {
    
    this.siteVisitService.getSiteVisits().subscribe(siteVisits => {
      this.siteVisits = siteVisits;
      this.completedSiteVisitsCount = this.countCompletedSiteVisits(siteVisits);
      this.incompleteSiteVisitsCount = this.countIncompleteSiteVisits(siteVisits);
      this.totalSiteVisitsCount = siteVisits.length;
    });
  }
  
  

  countCompletedSiteVisits(siteVisits: SiteVisit[]): number {
    let completedSiteVisitsCount = 0;
      for (let siteVisit of siteVisits) {
        if (siteVisit.state === 'completed') {
          completedSiteVisitsCount++;
        }
      }
    return completedSiteVisitsCount;
  }

  countIncompleteSiteVisits(siteVisits: SiteVisit[]): number {
    let incompleteSiteVisitsCount = 0;
      for (let siteVisit of siteVisits) {
        if (siteVisit.state !== 'completed') {
          incompleteSiteVisitsCount++;
        }
      }
    return incompleteSiteVisitsCount;
  }
  
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
  public onAddSiteVisit(addForm: NgForm): void {
 document.getElementById('add-siteVisit-form')?.click();
    // if (addButton !== null) {
      // addButton.click();
    // }
 
    this.siteVisitService.addSiteVisit(addForm.value).subscribe((response: SiteVisit) => {
        console.log(response);
        this.getSiteVisits();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
 
  
  public onUpdateSiteVisit(siteVisit: SiteVisit): void {
    
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
  
/*}
function subscribe(arg0: (count: number) => number) {
  throw new Error('Function not implemented.');*/
  public onOpenModal(siteVisit: SiteVisit | null,mode:string): void{
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


