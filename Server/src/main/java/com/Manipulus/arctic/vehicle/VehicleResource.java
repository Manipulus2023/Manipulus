package com.Manipulus.arctic.vehicle;

import com.Manipulus.arctic.vehicle.model.Vehicle;
import com.Manipulus.arctic.vehicle.service.VehicleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicle")
public class VehicleResource {
    private final VehicleService vehicleService;

    public VehicleResource(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Vehicle>> getAllVehicle() {
        List<Vehicle> vehicles = vehicleService.findAllVehicle();
        return new ResponseEntity<>(vehicles, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable("id") Long id) {
        Vehicle vehicles = vehicleService.findVehicleById(id);
        return new ResponseEntity<>(vehicles, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Vehicle> addVehicle(@RequestBody Vehicle vehicle) {
        Vehicle newVehicle = vehicleService.addVehicle(vehicle);
        return new ResponseEntity<>(newVehicle, HttpStatus.CREATED);

    }

    @PutMapping("/update")
    public ResponseEntity<Vehicle> updateVehicle(@RequestBody Vehicle vehicle) {
        Vehicle updateVehicle = vehicleService.updateVehicle(vehicle);
        return new ResponseEntity<>(updateVehicle, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteVehicle(@PathVariable("id") Long id) {
        vehicleService.deleteVehicleById(id);
    }

}
