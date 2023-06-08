import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnitService } from './unit.service';
import { Subscription } from 'rxjs';
import { Unit } from './unit';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css'],
})
export class UnitComponent implements OnInit, OnDestroy {
  addUnitForm: FormGroup;
  unitSubscription: Subscription;
  units: Unit[] = [];
  isAddUnitModalOpen = false;
  isEditUnitModalOpen = false;
  selectedUnit: any;

  constructor(private formBuilder: FormBuilder, private unitService: UnitService) {}

  ngOnInit() {
    //this.getUnitList();
    this.initializeUnitForm();
  }

  getUnitList(){
    this.unitSubscription = this.unitService.getUnitList().subscribe(res =>
    {
      this.units = res;
    });
  }

  initializeUnitForm() {
    this.addUnitForm = this.formBuilder.group({
      unitName: this.formBuilder.control(''),
      itemName: this.formBuilder.control(''),
      indoorSerial:this.formBuilder.control(''),
      outdoorSerial:this.formBuilder.control(''),
      commissionedDate:this.formBuilder.control(''),
      owner:this.formBuilder.control(''),
      installedLocationName: this.formBuilder.control(''),
      installedLocationAddress: this.formBuilder.control(''),
      installedParentLocation: this.formBuilder.control(''),
      warrantyPeriod: this.formBuilder.control(''),
      unitPrice: this.formBuilder.control(''),
      status: this.formBuilder.control(''),
    });
  }

  onUnitAdd() {
    console.log(this.addUnitForm.value);
    this.unitService.addUnit(this.addUnitForm.value).subscribe(res =>
      {
        console.log(res);
      });
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
  // // Update the selected unit in the list
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

  // closeEditUnitModal() {
  //   this.isEditUnitModalOpen = false;
  //   this.editUnitForm.reset();
  //   this.selectedUnit = null;
  // }

  searchUnit() {
    //const searchKey = this.searchForm.value.key;
    // Perform the search operation using the searchKey
    // ...
  }

  ngOnDestroy(): void {
    this.unitSubscription?.unsubscribe();
  }
}
