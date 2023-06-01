package com.Manipulus.arctic.vehicle.service;

import com.Manipulus.arctic.vehicle.exception.VehicleNotFoundException;
import com.Manipulus.arctic.vehicle.model.Vehicle;
import com.Manipulus.arctic.vehicle.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class VehicleService {
    private final com.Manipulus.arctic.vehicle.repository.VehicleRepository VehicleRepository;

    @Autowired
    public VehicleService(VehicleRepository vehicleRepository) {
        this.VehicleRepository = vehicleRepository;
    }

    public Vehicle addVehicle(Vehicle vehicle) {
        vehicle.setVehicle_code(UUID.randomUUID().toString());
        return VehicleRepository.save(vehicle);
    }

    public List<Vehicle> findAllVehicle() {
        return VehicleRepository.findAll();
    }

    public Vehicle updateVehicle(Vehicle vehicle) {
        return VehicleRepository.save(vehicle);
    }

    public Vehicle findVehicleById(Long id) {
        return VehicleRepository.findVehicleById(id)
                .orElseThrow(() -> new VehicleNotFoundException(" vehicle by id" + id + "was not found"));
    }

    @Transactional
    public void deleteVehicleById(long id) {
        VehicleRepository.deleteVehicleById(id);
    }
}
