import { Component, OnInit } from '@angular/core';
import { Vehicle } from './vehicle';
import { VehicleService } from './vehicle.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})

export class VehicleComponent implements OnInit {
  public vehicle: Vehicle[] = [];
  public editVehicle: Vehicle | undefined;
  public deleteVehicle!: Vehicle;

  // @ts-ignore
  selectedFile: File;

  id=24;
  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.getVehicles();
  }

  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  // onUpload() {
  //   const fd = new FormData();
  //   fd.append('file', this.selectedFile, this.selectedFile.name);
  //   this.vehicleService.uploadPhoto(this.id, fd).subscribe(
  //     res => {
  //       console.log(res);
  //       alert('Photo added successfully');
       
  //     },
  //     error => {
  //       console.log(error);
  //       alert('Error occurred while uploading photo');
  //     }
  //   );
  //   window.location.reload();
  // }

  onUpload(vehicleId: number) {
    // Rest of your code...
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.vehicleService.uploadPhoto(vehicleId, fd).subscribe(
     
      res => {
        console.log(vehicleId);
        console.log(res);
        alert('Photo added successfully');
      },
      error => {
        console.log(error);
        // alert('Error occurred while uploading photo');
      }
    );
    window.location.reload();
  }
  

  

  public getVehicles(): void {
    {
      this.vehicleService.getVehicleList().subscribe(
        (Response: Vehicle[]) => {
          this.vehicle = Response;
          console.log(this.vehicle);
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
    }
  }

  public onAddVehicle(addForm: NgForm): void {
    (document.getElementById('add-vehicle-form') as HTMLElement).click();
    this.vehicleService.addVehicle(addForm.value).subscribe(
      (Response: Vehicle) => {
        console.log(Response);
        this.getVehicles();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteVehicle(vehicleId: number): void {
    this.vehicleService.deleteVehicle(vehicleId).subscribe(
      (Response: void) => {
        console.log(Response);
        this.getVehicles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateVehicle(Vehicle: Vehicle): void {
    this.vehicleService.updateVehicle(Vehicle).subscribe(
      (Response: Vehicle) => {
        console.log(Response);
        this.getVehicles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal_vehice(vehicle: Vehicle, mode: string): void {
    const container = document.getElementById(
      'vehicle_details_container'
    ) as HTMLInputElement;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'edit') {
      button.setAttribute('data-bs-target', '#exampleModal22');
      this.editVehicle = vehicle;
    }
    if (mode === 'delete') {
      button.setAttribute('data-bs-target', '#exampleModal23');
      this.deleteVehicle = vehicle;
    }
    container.appendChild(button);
    button.click();
  }
}