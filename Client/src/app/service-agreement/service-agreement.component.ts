import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { Data } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';







@Component({
  selector: 'app-service-agreement',
  templateUrl: './service-agreement.component.html',
  styleUrls: ['./service-agreement.component.css']
})


export class ServiceAgreementComponent implements OnInit{

  dtoptions: DataTables.Settings = {};
  dtTriger: Subject<any> = new Subject<any>();
  ngOnInit(): void {
    // Define DataTables options
    
    this.dtoptions = {
      pagingType: 'full_numbers',
      destroy: true,
      // columns: [
      //   // Define your columns here...
      //   { data: 'name', orderable: true },
      //   { data: 'address', orderable: false },
      //   { data: 'contactNumber', orderable: false },
      //   { data: 'nic_number', orderable: true },
      //   { data: 'customer.address', orderable: true },
      //   { data: 'contactPersonName', orderable: false },
      //   { data: 'designation', orderable: false },
      //   { data: 'email', orderable: false },
      //   { data: 'customercode', orderable: false },
      //   // Disable sorting for this column
      // ],
      // order: [],
    };
    // Call getCustomers method to retrieve customer data
    this.getAllAgreement();
    this.dtoptions = {
      retrieve: true,
    };

    
  }


  refreshPage(){
    window.location.reload();
  }



  AgreementArray: any[] = [];
  CustomerArray: any[] = [];
  UnitArray: any[]=[];
  isResultLoaded = false;
  isUpdateFormActive = false;


  unitid: number = 0;
  item ?: string="";
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
    this.getAllUnits();

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

  register() {


    for(let i=0;i<this.UnitArray.length;i++){
      if(this.UnitArray[i].id==this.unitid){
        this.item=this.UnitArray[i].item_name;
      }
    }

    let bodyData = {

      "unitid": this.unitid,
      "item":this.item,
      "buttoId": this.unitid,
      "equipment": this.equipment,
      "price_per_service": this.price_per_service,
      "emergency_service_rate": this.emergency_service_rate,
      "type_of_the_service": this.type_of_the_service,
      "initiated_date": this.initiated_date,
      "expired_date": this.expired_date,
      "nic": this.nic,
    };


    if (this.unitid == 0 && this.item=='' &&this.equipment == '' && this.price_per_service <= 0 && this.emergency_service_rate <= 0 && this.type_of_the_service == '' && this.initiated_date == '' && this.expired_date == '' && this.nic == '') {

      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'All Details Required !',
        icon: 'error',
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

    }
    else if (this.unitid == 0 || isNaN(Number(this.unitid))) {
      // alert("Please insert an existing UnitId!");



      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please insert an existing UnitId!',
        icon: 'error',
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
    } 
    
    else if (this.item == ''||this.item=="choose an existing item...") {
      // alert("Please insert an existing UnitId!");



      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please insert an existing Item Name!',
        icon: 'error',
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
    } 
    else if (this.equipment == '') {
      // alert("Please insert the Description!");
      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please insert the Equipment!',
        icon: 'error',
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

    } else if (this.price_per_service <= 0 || isNaN(Number(this.price_per_service))) {
      //alert("Please insert the Service Price correctly!");
      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please insert the Service Price correctly!',
        icon: 'error',
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

    } else if (this.emergency_service_rate <= 0||isNaN(Number(this.emergency_service_rate))) {
      // alert("Please insert the Emergency Service Price correctly!");
      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please insert the Emergency Service Price correctly!',
        icon: 'error',
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
    } else if (this.type_of_the_service == '') {
      // alert("Please Choose a Service Type!");
      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please Choose a Service Type!',
        icon: 'error',
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
    } else if (this.initiated_date == null) {
      //alert("Please enter the initial date!");
      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please enter the initial date!',
        icon: 'error',
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
    }

    else if (this.initiated_date>=this.expired_date) {
      //alert("Please enter the initial date!");
      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please enter the valid initial date and expired date!',
        icon: 'error',
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
    }
    else if (this.expired_date == null) {
      // alert("please enter the expire date!");
      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'please enter the expire date!',
        icon: 'error',
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
    } else if (this.nic == ''||this.nic=="choose an existing customer...") {
      // alert("Please insert an existing NIC number!")
      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please insert an existing NIC number!',
        icon: 'error',
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
    }

    else {

      this.http.post("http://localhost:8080/api/v1/agreement/save", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
        console.log(resultData);
        // alert("Service Agreement Created Successfully");
        Swal.fire({
          title: 'Service Agreement Created Successfully',
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

        this.getAllAgreement();

        this.unitid = 0;
        this.item='';
        this.equipment = '';
        this.price_per_service = 0;
        this.emergency_service_rate = 0;
        this.type_of_the_service = '';
        this.initiated_date = '';
        this.expired_date = '';
        this.nic = '';

      });





    }
  }



  setUpdate(data: any) {

    this.unitid = data.unitid;
    this.item=data.item;
    this.equipment = data.equipment;
    this.price_per_service = data.price_per_service;
    this.emergency_service_rate = data.emergency_service_rate;
    this.type_of_the_service = data.type_of_the_service;
    this.initiated_date = data.initiated_date;
    this.expired_date = data.expired_date;
    this.nic = data.nic;
    this.currentAgreementID = data.agreementid;


  }

  UpdateRecords() {




    for(let i=0;i<this.UnitArray.length;i++){
      if(this.UnitArray[i].id==this.unitid){
        this.item=this.UnitArray[i].item_name;
      }
    }

    let bodyData = {

      "agreementid": this.currentAgreementID,
      "unitid": this.unitid,
      "item": this.item,
      "equipment": this.equipment,
      "price_per_service": this.price_per_service,
      "emergency_service_rate": this.emergency_service_rate,
      "type_of_the_service": this.type_of_the_service,
      "initiated_date": this.initiated_date,
      "expired_date": this.expired_date,
      "nic": this.nic,

    };


    if (this.unitid == 0 && this.item=='' && this.equipment == '' && this.price_per_service <= 0 && this.emergency_service_rate <= 0 && this.type_of_the_service == '' && this.initiated_date == '' && this.expired_date == '' && this.nic == '') {

      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'All Details Required !',
        icon: 'error',
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

    }
    else if (this.unitid == 0|| isNaN(Number(this.unitid))) {
      // alert("Please insert an existing UnitId!");



      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please insert an existing UnitId!',
        icon: 'error',
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

    } 
    
    else if (this.item == ''||this.item=="choose an existing item...") {
      // alert("Please insert an existing UnitId!");



      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please insert an existing Item name!',
        icon: 'error',
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





    } else if (this.equipment == '') {
      // alert("Please insert the Description!");
      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please insert the Equipment!',
        icon: 'error',
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

    } else if (this.price_per_service <= 0||isNaN(Number(this.price_per_service))) {
      //alert("Please insert the Service Price correctly!");
      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please insert the Service Price correctly!',
        icon: 'error',
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

    } else if (this.emergency_service_rate <= 0||isNaN(Number(this.emergency_service_rate))) {
      // alert("Please insert the Emergency Service Price correctly!");
      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please insert the Emergency Service Price correctly!',
        icon: 'error',
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
    } else if (this.type_of_the_service == '') {
      // alert("Please Choose a Service Type!");
      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please Choose a Service Type!',
        icon: 'error',
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
    } else if (this.initiated_date>=this.expired_date) {
      //alert("Please enter the initial date!");
      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please enter the valid initial date and expired date!',
        icon: 'error',
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
    }
    
    else if (this.initiated_date == null) {
      //alert("Please enter the initial date!");
      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please enter the initial date!',
        icon: 'error',
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
    }
    else if (this.expired_date == null) {
      // alert("please enter the expire date!");
      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'please enter the expire date!',
        icon: 'error',
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
    } else if (this.nic == '' || this.nic=="choose an existing customer...") {
      // alert("Please insert an existing NIC number!")
      Swal.fire({
        title: 'Fill The Form Correctly',
        text: 'Please insert an existing NIC number!',
        icon: 'error',
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
    } else {

      this.http.put("http://localhost:8080/api/v1/agreement/update", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
        console.log(resultData);
        // alert("Service Agreement is Updated")
        Swal.fire({
          title: 'Service Agreement is Updated Successfully',
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
      


        this.getAllAgreement();
        this.unitid = 0;
        this.item='';
        this.equipment = '';
        this.price_per_service = 0;
        this.emergency_service_rate = 0;
        this.type_of_the_service = '';
        this.initiated_date = '';
        this.expired_date = '';
        this.nic = '';
      
        

      });
    }
  }


  save() {


    if (this.currentAgreementID == '') {
      this.register();
    }
    else {
      this.UpdateRecords();
    }



  }






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

  

  setDelete(data: any) {
    Swal.fire({
      title: 'Delete Confirmation',
      text: 'Are you sure you want to delete this agreement?',
      icon: 'warning',
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
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAgreement(data.agreementid);
      }
    });
  }
  
  deleteAgreement(agreementId: string) {
    this.http.delete("http://localhost:8080/api/v1/agreement/deleteagreement" + "/" + agreementId, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      Swal.fire({
        title: 'Delete is Successful',
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
      this.getAllAgreement();
  
      this.unitid = 0;
      this.item='';
      this.equipment = '';
      this.price_per_service = 0;
      this.emergency_service_rate = 0;
      this.type_of_the_service = '';
      this.initiated_date = '';
      this.expired_date = '';
      this.nic = '';
    });
  }
  




  apiurl = "http://localhost:8080/api/v1/agreement/passId";

  postId(inputdata: any) {
    return this.http.post(this.apiurl, inputdata)
  }

  navigateToUrl(url: string): void {
    window.location.href = url;

    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
  }



  getAllNIC() {

    this.http.get("http://localhost:8080/customer/all")

      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.CustomerArray = resultData;
      });
  }

  getAllUnits() {

    this.http.get("http://localhost:8080/units")

      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.UnitArray = resultData;
      });
  }

}