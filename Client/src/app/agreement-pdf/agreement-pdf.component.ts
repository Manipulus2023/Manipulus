import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { Data } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agreement-pdf',
  templateUrl: './agreement-pdf.component.html',
  styleUrls: ['./agreement-pdf.component.css']
})

export class AgreementPdfComponent implements OnInit{



  
//DataTabele.....................................
  dtoptions: DataTables.Settings = {};
  dtTriger: Subject<any> = new Subject<any>();
  ngOnInit(): void {
    // Define DataTables options
    
    this.dtoptions = {
      pagingType: 'full_numbers',
      destroy: true,
   
    };
    // Call getCustomers method to retrieve customer data
    this.getAllAgreement();
    this.dtoptions = {
      retrieve: true,
    };

    
  }

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






getAllAgreement() {

    this.http.get("http://localhost:8080/api/v1/agreement/getAllAgreement")

      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.AgreementArray = resultData;
        this.dtTriger.next(null);
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

      setTimeout(() => {
        window.location.reload();
      }, 1500);



    });
  }


  //pdf preview...............................................
  pdfUrl: string = 'http://localhost:8080/pdf';

  generateAndPreviewPdf() {
    this.http.get('http://localhost:8080/pdf', { responseType: 'blob' })
      .subscribe((response: Blob) => {
        this.pdfUrl = URL.createObjectURL(response);
      });
  }

//...............................................................

//...............................................................


  public onOpenModal(mode: string): void {
    const container = (document.getElementById('main-container') as HTMLInputElement);
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    container.appendChild(button);
    button.click();
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
