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
  searchForm: FormGroup;
  unitSubscription: Subscription;
  units: Unit[] = [];
  isAddUnitModalOpen = false;
  isEditUnitModalOpen = false;
  selectedUnit: any;
  key: string;

  constructor(private formBuilder: FormBuilder, private unitService: UnitService) {
    this.addUnitForm = this.formBuilder.group({
      // define form controls with validators
      unitName: ['', Validators.required],
      itemName: ['', Validators.required],
      indoorSerial: [''],
      outdoorSerial: [''],
      commissionedDate: [''],
      owner: [''],
      installedLocationName: [''],
      installedLocationAddress: [''],
      installedParentLocation: [''],
      warrantyPeriod: [''],
      unitPrice: [''],
      status: [''],
      // add more form controls as needed
    });
    this.searchForm = this.formBuilder.group({
      key: ['']
    });
  }
  ngOnInit() {
    this.getUnitList();
    this.initializeUnitForm();
  }

  ngOnDestroy(): void {
    this.unitSubscription?.unsubscribe();
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
   if (this.addUnitForm.invalid) {
      return;
    }
    const newUnit = this.addUnitForm.value;
    this.units.push(newUnit );
    this.closeAddUnitModal();
  }

  onEditUnitSubmit() {
    if (this.addUnitForm.invalid) {
      return;
    }

  const updatedUnit = this.addUnitForm.value;
  // Update the selected unit in the list
  const index = this.units.findIndex(unit => unit === this.selectedUnit);
  if (index !== -1) {
    this.units[index] = updatedUnit;
  }

    this.closeEditUnitModal();
  }

  openAddUnitModal() {
    this.isAddUnitModalOpen = true;
  }

  closeAddUnitModal() {
    this.isAddUnitModalOpen = false;
    this.addUnitForm.reset();
  }

  openEditUnitModal(unit: any) {
    this.isEditUnitModalOpen = true;
    this.selectedUnit = unit;
    this.addUnitForm.patchValue({
      unitName: unit.unitName,
      itemName: unit.itemName,
      indoorSerial:unit.indoorSerial,
      outdoorSerial:unit.outdoorSerial,
      commissionedDate:unit.commissionedDate,
      owner:unit.owner,
      installedLocationName:unit.installedLocationName ,
      installedLocationAddress:unit.installedLocationAddress ,
      installedParentLocation:unit.installedparentLocation ,
      warrantyPeriod:unit.warrantyPeriod ,
      unitPrice: unit.unitPrice,
      status:unit.status ,
    });
  }


  closeEditUnitModal() {
    this.isEditUnitModalOpen = false;
    this.addUnitForm.reset();
    this.selectedUnit = null;
  }

  searchUnit(value: string)  {
    const searchKey = this.searchForm.value.key;
    // Perform the search operation using the searchKey
    // ...
  }

  // ngOnDestroy(): void {
  //   this.unitSubscription?.unsubscribe();
  }

