import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Unit } from './unit';
import { UnitServise } from './unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css'],
})
export class UnitComponent implements OnInit {
  public unit: Unit[] = [];
  public editUnit: Unit | undefined;
  public deleteUnit!: Unit;
  constructor(private unitService: UnitServise) {}
  ngOnInit(): void {
    this.getUnits(); //View an unit
  }

  // get all units
  public getUnits(): void {
    {
      this.unitService.getUnitList().subscribe(
        (Response: Unit[]) => {
          this.unit = Response;
          console.log(this.unit);
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
    }
  }
  public onAddUnit(addForm: NgForm): void { //Add a new unit
    (document.getElementById('add-unit-form') as HTMLElement).click();
    this.unitService.addUnit(addForm.value).subscribe(
      (Response: Unit) => {
        console.log(Response);
        this.getUnits();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteUnit(unitId: number): void { //Delete a unit
    // (document.getElementById('add-unit-form') as HTMLElement).click();
    this.unitService.deleteUnit(unitId).subscribe(
      (Response: void) => {
        console.log(Response);
        this.getUnits();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onUpdateUnit(Unit: Unit): void { //Update a unit
    this.unitService.updateUnit(Unit).subscribe(
      (Response: Unit) => {
        console.log(Response);
        this.getUnits();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // open the modal window for edit or delete action
  public onOpenModal_unit(unit: Unit, mode: string): void {
    //Open modal
    const container = document.getElementById(
      'unit_details_container'
    ) as HTMLInputElement;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'edit') {
      //edit function
      button.setAttribute('data-bs-target', '#exampleModal22');
      this.editUnit = unit;
    }
    if (mode === 'delete') {
      //delete function
      button.setAttribute('data-bs-target', '#exampleModal23');
      this.deleteUnit = unit;
    }
    container.appendChild(button);
    button.click();
  }
}
