import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import { error } from '@angular/compiler/src/util';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {


  public customers : Customer[] =[];
  public editCustomer: Customer | undefined;
  public deleteCustomer!: Customer;

  constructor( private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  public getCustomers():void { {
    this.customerService.getCustomerList().subscribe(
      (response: Customer[]) =>{
        this.customers = response;
        console.log(this.customers);
      },
      (error: HttpErrorResponse) =>
         alert(error.message)
        
      ); }}

      public onAddCustomer(addForm: NgForm):void{
         (document.getElementById("add-customer-form") as HTMLInputElement).click();
        this.customerService.addCustomer(addForm.value).subscribe(
          (response: Customer)=> {
            console.log(response);
            this.getCustomers();
            addForm.reset();
          },
          (error: HttpErrorResponse) =>  {
            alert(error.message);

          } 
        );
      }
      public onDeleteCustomer(customerId: number):void{
        
       this.customerService.deleteCustomer(customerId).subscribe(
         (response: void)=> {
           console.log(response);
           this.getCustomers();
          
         },
         (error: HttpErrorResponse) =>  {
           alert(error.message);

         } 
       );
     }

      public onUpdateCustomer(Customer: Customer):void{
        
       this.customerService.updateCustomer(Customer).subscribe(
         (response: Customer)=> {
           console.log(response);
           this.getCustomers();
         },
         (error: HttpErrorResponse) =>  {
           alert(error.message);

         } 
       );
     }

public searchCustomer(key: string): void{
  console.log(key);
  const results: Customer[] =[];
  for (const customer of this.customers){
    if((customer.name.toLowerCase().indexOf(key.toLowerCase()) !== -1)
    ||(customer.email.toLowerCase().indexOf(key.toLowerCase()) !== -1)
    ||(customer.contactPersonName.toLowerCase().indexOf(key.toLowerCase()) !== -1)
    )
      {
        results.push(customer);
      }
  }
 this.customers =results;
 if(results.length === 0 || !key){
  this.getCustomers();
 }
}


      public onOpenModal(customer:Customer, mode:string):void {
        const container = (document.getElementById('main-container') as HTMLInputElement);
          const button = document.createElement('button');
          button.type = 'button';
          button.style.display = 'none';
          button.setAttribute('data-bs-toggle','modal');
          if(mode === 'edit'){
            button.setAttribute('data-bs-target','#exampleModal2');
            this.editCustomer = customer;
          }
          if(mode === 'delete'){
            button.setAttribute('data-bs-target','#exampleModal3');
            this.deleteCustomer = customer;
          }
          container.appendChild(button);
          button.click();
      }
}
