import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-agreement',
  templateUrl: './service-agreement.component.html',
  styleUrls: ['./service-agreement.component.css']
})


export class ServiceAgreementComponent {

  showMe:boolean=false
  ngOnInit(){

  }
  toogleTag()
  {
    this.showMe=!this.showMe
  }


  showMeForm:boolean=false
  ngOnInitForm(){

  }
  toogleTagForm()
  {
    this.showMeForm=!this.showMeForm
  }

  AgreementArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;


  unitid: Number=0;
  equipment: string="";
  price_per_service: Number=0;
  emergency_service_rate: Number=0;
  type_of_the_service: string="";
  initiated_date: string="";
  expired_date: string="";

  currentAgreementID = "";



constructor(private http: HttpClient )
  {
    this.getAllAgreement();

  }

  getAllAgreement()
  {

    this.http.get("http://localhost:8080/api/v1/agreement/getAllAgreement")

    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.AgreementArray = resultData;
    });
  }

  register()
  {

    let bodyData = {

      "unitid" : this.unitid,
      "buttoId" : this.unitid,
      "equipment" : this.equipment,
      "price_per_service" : this.price_per_service,
      "emergency_service_rate" : this.emergency_service_rate,
      "type_of_the_service" : this.type_of_the_service,
      "initiated_date" : this.initiated_date,
      "expired_date" : this.expired_date
    };

    this.http.post("http://localhost:8080/api/v1/agreement/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Service Agreement Created Successfully");
        this.getAllAgreement();

        this.unitid = 0;
        this.equipment ='';
        this.price_per_service =0;
        this.emergency_service_rate=0;
        this.type_of_the_service ='';
        this.initiated_date='';
        this.expired_date='';

    });
  }

   

  setUpdate(data: any)
  {

    this.unitid = data.unitid;
    this.equipment =data.equipment;
    this.price_per_service =data.price_per_service;
    this.emergency_service_rate=data.emergency_service_rate;
    this.type_of_the_service =data.type_of_the_service;
    this.initiated_date=data.initiated_date;
    this.expired_date=data.expired_date;
    this.currentAgreementID = data.agreementid;


  }

  UpdateRecords()
  {
    let bodyData = {

      "agreementid" : this.currentAgreementID,
      "unitid" : this.unitid,
      "buttoId" : this.unitid,
      "equipment" : this.equipment,
      "price_per_service" : this.price_per_service,
      "emergency_service_rate" : this.emergency_service_rate,
      "type_of_the_service" : this.type_of_the_service,
      "initiated_date" : this.initiated_date,
      "expired_date" : this.expired_date

    };

    this.http.put("http://localhost:8080/api/v1/agreement/update",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Service Agreement is Updated")


        this.getAllAgreement();
        this.unitid = 0;
        this.equipment ='';
        this.price_per_service =0;
        this.emergency_service_rate=0;
        this.type_of_the_service ='';
        this.initiated_date='';
        this.expired_date='';


    });
  }

  save()
  {
    if(this.currentAgreementID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }

  }

  setDelete(data: any)
  {


    this.http.delete("http://localhost:8080/api/v1/agreement/deleteagreement"+ "/"+ data.agreementid,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Service Agreement Deleted")
        this.getAllAgreement();

        this.unitid = 0;
        this.equipment ='';
        this.price_per_service =0;
        this.emergency_service_rate=0;
        this.type_of_the_service ='';
        this.initiated_date='';
        this.expired_date='';



    });

  }

  public onOpenModal(mode:string):void {
    const container = (document.getElementById('main-container') as HTMLInputElement);
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-bs-toggle','modal');
    
      container.appendChild(button);
      button.click();
  }


}
