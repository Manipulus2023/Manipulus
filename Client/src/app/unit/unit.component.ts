import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css'],
})

export class UnitComponent implements OnInit {
  addUnitForm: FormGroup;
  units: any[] = []; // Placeholder for unit list
  //editUnitForm: FormGroup;
  isAddUnitModalOpen = false;
  isEditUnitModalOpen = false;
  selectedUnit: any;
  // location: this.fb.group({
  //   installedLocation: [''],
  //   name: [''],
  //   address: [''],
  //   parentLocation: [''],
  // warrantyPeriod: [''],
  // unitPrice: [''],
  // status: [''],

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initializeUnitForm();
  }

  initializeUnitForm() {
    this.addUnitForm =  this.formBuilder.group({
      unitName: this.formBuilder.control(''),
      itemName: this.formBuilder.control(''),
      installedLocation:this.formBuilder.control(''),
      installedname:this.formBuilder.control(''),
      installedaddressn:this.formBuilder.control(''),
      installedparentLocation:this.formBuilder.control(''),
      warrantyPeriod:this.formBuilder.control(''),
      unitPrice:this.formBuilder.control(''),
      status:this.formBuilder.control(''),

    });
  }

  onItemAdd(){
    console.log(this.addUnitForm.value);

  }

  onAddUnitSubmit() {
    // if (this.addUnitForm.invalid) {
    //   return;
    // }
    // const newUnit = this.addUnitForm.value;
    // this.units.push(newUnit );
    // this.closeAddUnitModal();
  }

  // onEditUnitSubmit() {
  //   if (this.editUnitForm.invalid) {
  //     return;
  //   }

  // const updatedUnit = this.editUnitForm.value;
  // // Update the selected customer in the list
  // const index = this.units.findIndex(unit => unit === this.selectedUnit);
  // if (index !== -1) {
  //   this.units[index] = updatedUnit;
  // }

  //   this.closeEditUnitModal();
  // }

  openAddUnitModal() {
    this.isAddUnitModalOpen = true;
  }

  closeAddUnitModal() {
    // this.isAddUnitModalOpen = false;
    // this.addUnitForm.reset();
  }

  // openEditUnitModal(unit: any) {
  //   this.isEditUnitModalOpen = true;
  //   this.selectedUnit = unit;
  //   // Pre-fill the edit form with the selected unit's data
  //  // this.editUnitForm.patchValue({
  //   unitName: unit.unitName,
  //   itemName: unit.itemName,
  //     // Update other customer fields
  //   });
  // }

  // closeEditCustomerModal() {
  //   this.isEditUnitModalOpen = false;
  //   this.editUnitForm.reset();
  //   this.selectedUnit = null;
  // }

  searchCustomer() {
    //const searchKey = this.searchForm.value.key;
    // Perform the search operation using the searchKey
    // ...
  }
}
