import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SiteVisitService } from './site-visit.service';
import { SiteVisit } from './siteVisit';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-site-visit',
  templateUrl: './site-visit.component.html',
  styleUrls: ['./site-visit.component.css']
})
export class SiteVisitComponent implements OnInit {
 
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  public siteVisits: SiteVisit[] ;
  public editSiteVisits: SiteVisit | undefined;
  public deleteSiteVisits: SiteVisit | undefined ;

  constructor(private siteVisitService : SiteVisitService) {
    this.siteVisits=[];
   }

  ngOnInit(): void {
    this.getSiteVisits();
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
}
function subscribe(arg0: (count: number) => number) {
  throw new Error('Function not implemented.');
}
