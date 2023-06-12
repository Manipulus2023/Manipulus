import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnitService } from './unit.service';
import { Subject, Subscription } from 'rxjs';
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
  public editUnit!: Unit;
  public deleteUnit!: Unit;
  key: string;

  //Data Table configs
  dtoptions: DataTables.Settings = {};
  dtTriger: Subject<any> = new Subject<any>();

  constructor(private formBuilder: FormBuilder, private unitService: UnitService) {
    this.searchForm = this.formBuilder.group({
      key: ['']
    });
  }

  ngOnInit() {
    this.loadDataTableConfigs();
    this.getUnitList();
    this.initializeUnitForm();
  }

  loadDataTableConfigs() {
    this.dtoptions = {
      pagingType: 'full_numbers',
      destroy: true,
    };
    this.dtoptions = {
      retrieve: true,
    };
  }

  getUnitList(){
    this.unitSubscription = this.unitService.getUnitList().subscribe(res =>
    {
      this.units = res;
    });
  }

  initializeUnitForm() {
    this.addUnitForm = this.formBuilder.group({
      unit_name: this.formBuilder.control(''),
      item_name: this.formBuilder.control(''),
      indoor_serial:this.formBuilder.control(''),
      outdoor_serial:this.formBuilder.control(''),
      commissioned_date:this.formBuilder.control(''),
      owner:this.formBuilder.control(''),
      installed_location_name: this.formBuilder.control(''),
      installed_location_address: this.formBuilder.control(''),
      installed_parent_location: this.formBuilder.control(''),
      warranty_period: this.formBuilder.control(''),
      unit_price: this.formBuilder.control(''),
      status: this.formBuilder.control(''),
    });
  }

  onUnitAdd() {
    this.unitService.addUnit(this.addUnitForm.value).subscribe(res =>
      {
        if (res.id > 0) {
          this.isAddUnitModalOpen = false;
          this.getUnitList();
        }
      });
  }

  onDeleteUnit() {
    this.unitService.deleteUnit(this.deleteUnit.id).subscribe(res=>{
      if(res == null) {
        this.getUnitList();
      }
    });
  }

  openAddUnitModal() {
    this.isAddUnitModalOpen = true;
  }

  searchUnit() {
    //const searchKey = this.searchForm.value.key;
    // Perform the search operation using the searchKey
    // ...
  }

  ngOnDestroy(): void {
    this.unitSubscription?.unsubscribe();
  }

  public onOpenModal(unit: Unit, mode: string): void {
    const container = document.getElementById(
      'main-container'
    ) as HTMLInputElement;

    // Create a hidden button element
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    // If mode is 'edit', set data-bs-target attribute to edit modal and assign unit to editUnit property
    if (mode === 'edit') {
      button.setAttribute('data-bs-target', '#exampleModal2');
      this.editUnit = unit;
    }

    // If mode is 'delete', set data-bs-target attribute to delete modal and assign unit to deleteUnit property
    if (mode === 'delete') {
      button.setAttribute('data-bs-target', '#exampleModal3');
      this.deleteUnit = unit;
    }

    // Append button to main container element and trigger a click event
    container.appendChild(button);
    button.click();
  }
}
