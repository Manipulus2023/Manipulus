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



  

  
  //from......................................
    showMe: boolean = false
    
    toogleTag() {
      this.showMe = !this.showMe
    }
  
  
    showMeForm: boolean = false
    ngOnInitForm() {
  
    }
    toogleTagForm() {
      this.showMeForm = !this.showMeForm
    }
  
    pdfDownloadLink: string;
  
  
    DontshowMeTable: boolean = true
    ngOnInitTable() {
  
    }
    toogleTagTable() {
      this.DontshowMeTable = !this.DontshowMeTable
    }
  
  
  
  
  //get agreement details from agreement table........................
    AgreementArray: any[] = [];
    CustomerArray: any[] = [];
    isResultLoaded = false;
    isUpdateFormActive = false;
  
  
    unitid: number = 0;
    equipment: string = "";
    price_per_service: number = 0;
    emergency_service_rate: number = 0;
    type_of_the_service: string = "";
    initiated_date: string ;
    expired_date: string;
    nic: string = "";
  
  
  
    currentAgreementID = "";
  
  
  
    constructor(private http: HttpClient) {
      this.getAllAgreement();
      this.getAllNIC();
  
    }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  
  
  
  
  
  getAllAgreement() {
  
      this.http.get("http://localhost:8080/api/v1/agreement/getAllAgreement")
  
        .subscribe((resultData: any) => {
          this.isResultLoaded = true;
          console.log(resultData);
          this.AgreementArray = resultData;
          
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
  