import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agreement-pdf',
  templateUrl: './agreement-pdf.component.html',
  styleUrls: ['./agreement-pdf.component.css']
})
export class AgreementPdfComponent implements OnInit{



  


  
  //get agreement details from agreement table........................
    AgreementArray: any[] = [];
    searchAgreementArray: any[] = [];
    searchAgreementArrayBynic: any[] = [];
    searchAgreementArrayByid: any[] = [];
    CustomerArray: any[] = [];
    isResultLoaded = false;
    isUpdateFormActive = false;
  
  
    unitid: number = 0;
    item: string='';
    equipment: string = "";
    price_per_service: number = 0;
    emergency_service_rate: number = 0;
    type_of_the_service: string = "";
    initiated_date: string ;
    expired_date: string;
    nic: string = "";
    searchnic:string="";
    searchid:string="";
  
  
  
    currentAgreementID = "";
  
  
  
    constructor(private http: HttpClient) {
      this.getAllAgreement();
      this.getAllNIC();
  
    }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  


  searchID(searchid:string){
      
    this.searchAgreementArray=[];
   let j=0;
    for(let i=0;i<this.AgreementArray.length;i++){
       if(this.AgreementArray[i].agreementid==this.searchid ){
       this.searchAgreementArray[j]=this.AgreementArray[i];
       j++;
       }

       this.searchAgreementArrayByid=this.searchAgreementArray;
    }

    if(this.searchid==''&& this.searchnic=='' ){
      this.searchAgreementArray=this.AgreementArray;
   }

   if(this.searchid=='' && !(this.searchnic=='')){
     this.searchNIC(this.searchnic);
   }

   if(!(this.searchnic=='') && !(this.searchid=='')){
    this.searchAgreementArray=[];
    let j=0;
     for(let i=0;i<this.AgreementArray.length;i++){
        if(this.AgreementArray[i].nic==this.searchnic && this.AgreementArray[i].agreementid==this.searchid){
        this.searchAgreementArray[j]=this.AgreementArray[i];
        j++;
        }
        this.searchAgreementArrayBynic=this.searchAgreementArray;
    }
}

  
}
  


  searchNIC(searchnic:string){

       this.searchAgreementArray=[];
      let j=0;
       for(let i=0;i<this.AgreementArray.length;i++){
          if(this.AgreementArray[i].nic==this.searchnic ){
          this.searchAgreementArray[j]=this.AgreementArray[i];
          j++;
          }
          this.searchAgreementArrayBynic=this.searchAgreementArray;
       }

       if(this.searchnic=='' && this.searchid=='' ){
         this.searchAgreementArray=this.AgreementArray;
      }
      
      if(this.searchnic=='' && !(this.searchid=='')){
         this.searchID(this.searchid);
         
      }

      if(!(this.searchnic=='') && !(this.searchid=='')){
        this.searchAgreementArray=[];
        let j=0;
         for(let i=0;i<this.AgreementArray.length;i++){
            if(this.AgreementArray[i].nic==this.searchnic && this.AgreementArray[i].agreementid==this.searchid){
            this.searchAgreementArray[j]=this.AgreementArray[i];
            j++;
            }
            this.searchAgreementArrayBynic=this.searchAgreementArray;
         }
     }

  }



  
  
  
  getAllAgreement() {
  
      this.http.get("http://localhost:8080/api/v1/agreement/getAllAgreement")
  
        .subscribe((resultData: any) => {
          this.isResultLoaded = true;
          console.log(resultData);
          this.AgreementArray = resultData;
          this.searchAgreementArray=resultData;
          
        });
    }
  
  
  //pdf ......................................
  
    passIdForGeneratePdf(data: any) {
  
  
      this.currentAgreementID = data.agreementid;
  
      let bodyData = {
  
        "agreementid": this.currentAgreementID,
  
  
      };
  
      this.http.put("http://localhost:8080/api/v1/agreement/passId", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
        console.log(resultData);
        // alert("PDF is generated")
        Swal.fire({
          title: 'PDF is generated Successfully',
          //  text: 'Please insert an existing NIC number!',
          icon: 'success',
          position: 'top',
          width: '500px',
          imageUrl: '../../assets/Icon/303292717_570886498156142_5541375326204770233_n.jpg',
          imageHeight: '100px',
          imageWidth: '100px',
          confirmButtonColor: '#3085d6',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-secondary',
  
          },
        });
  
      
  
      });
    }
  
  
  
  
  
  
  
    //get customer nic from customer table................
  
    apiurl = "http://localhost:8080/api/v1/agreement/passId";
  
    postId(inputdata: any) {
      return this.http.post(this.apiurl, inputdata)
    }
  
    navigateToUrl(url: string): void {
      window.location.href = url;
    }
  
  
  
    getAllNIC() {
  
      this.http.get("http://localhost:8080/customer/all")
  
        .subscribe((resultData: any) => {
          this.isResultLoaded = true;
          console.log(resultData);
          this.CustomerArray = resultData;
      });
    }
  
  }
  