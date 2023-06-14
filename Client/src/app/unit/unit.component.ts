import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  editUnitForm: FormGroup;
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

  @ViewChild('closeDeleteModal') closeDeleteModal: ElementRef
  @ViewChild('closeEditModal') closeEditModal: ElementRef

  constructor(private formBuilder: FormBuilder, private unitService: UnitService) {
    this.searchForm = this.formBuilder.group({
      key: ['']
    });
  }

  ngOnInit() {
    this.loadDataTableConfigs();
    this.getUnitList();
    this.initializeUnitForm();
    this.initializeUnitEditForm();
  }

  onClickDeleteUnit(unitId: number) {
    this.selectedUnit = unitId;
  }

  onClickEditUnit(unitId: number) {
    this.selectedUnit = unitId;
    this.loadSelectedUnit(this.selectedUnit);
  }

  loadSelectedUnit(unitId: number) {
    const selectedUnit = this.units.filter(u => u.id === unitId);
    if(selectedUnit != null) {
      this.setValuesToEditForm(selectedUnit[0]);
    }
  }

  setValuesToEditForm(unit: Unit) {
    this.editUnitForm.setValue({
      unit_name: unit.unit_name,
      item_name: unit.item_name,
      indoor_serial: unit.indoor_serial,
      outdoor_serial: unit.outdoor_serial,
      commissioned_date: unit.commissioned_date,
      owner: unit.owner,
      installed_location_name: unit.installed_location_name,
      installed_location_address: unit.installed_location_address,
      installed_parent_location: unit.installed_parent_location,
      warranty_period: unit.warranty_period,
      unit_price: unit.unit_price,
      status: unit.status
    });
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
      unit_name: this.formBuilder.control('', Validators.required),
      item_name: this.formBuilder.control('', Validators.required),
      indoor_serial:this.formBuilder.control(''),
      outdoor_serial:this.formBuilder.control(''),
      commissioned_date:this.formBuilder.control('', Validators.required),
      owner:this.formBuilder.control('', Validators.required),
      installed_location_name: this.formBuilder.control('', Validators.required),
      installed_location_address: this.formBuilder.control('', Validators.required),
      installed_parent_location: this.formBuilder.control('', Validators.required),
      warranty_period: this.formBuilder.control('',[Validators.required, Validators.min(0)]),
      unit_price: this.formBuilder.control('', [Validators.required, Validators.min(0)]),
      status: this.formBuilder.control('', Validators.required),
    });
  }

  initializeUnitEditForm() {
    this.editUnitForm = this.formBuilder.group({
      unit_name: this.formBuilder.control('', Validators.required),
      item_name: this.formBuilder.control('', Validators.required),
      indoor_serial:this.formBuilder.control(''),
      outdoor_serial:this.formBuilder.control(''),
      commissioned_date:this.formBuilder.control('', Validators.required),
      owner:this.formBuilder.control('', Validators.required),
      installed_location_name: this.formBuilder.control('', Validators.required),
      installed_location_address: this.formBuilder.control('', Validators.required),
      installed_parent_location: this.formBuilder.control('', Validators.required),
      warranty_period: this.formBuilder.control('',[Validators.required, Validators.min(0)]),
      unit_price: this.formBuilder.control('', [Validators.required, Validators.min(0)]),
      status: this.formBuilder.control('', Validators.required),
    });
  }

  onUnitAdd() {
    this.unitService.addUnit(this.addUnitForm.value).subscribe(res => {
      if (res.id > 0) {
        this.isAddUnitModalOpen = false;
        this.getUnitList();
      }
    });
  }

  onUnitEdit(){
    this.unitService.editUnit(this.selectedUnit, this.editUnitForm.value).subscribe(res => {
      if(res.id > 0) {
        this.getUnitList();
        this.closeEditModal.nativeElement.click();
        this.selectedUnit = 0;
      }
    });
  }

  onDeleteUnit() {
    this.unitService.deleteUnit(this.selectedUnit).subscribe(res=>{
      if(res == null) {
        this.getUnitList();
        this.closeDeleteModal.nativeElement.click();
        this.selectedUnit = 0;
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
}
