package com.Manipulus.arctic.location;

import com.Manipulus.arctic.location.model.Location;
import com.Manipulus.arctic.location.service.locationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/location")
public class locationController {

    private final locationService locationService;
    public locationController(locationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Location>> getAlllocation() {
        // Get all locations using the locationService
        List<Location> locations = locationService.findAlllocations();
        // Return the list of locations and the status code 200 (OK)
        return new ResponseEntity<>(locations, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable("id") Long id) {
        Location location = locationService.findLocationById(id);
        return new ResponseEntity<>(location, HttpStatus.OK);
    }
//    @GetMapping("/customer/{customerId}")
//    public ResponseEntity<List<location>> getLocationsByCustomerId(@PathVariable Long customerId) {
//        List<location> locations = locationService.findLocationsByCustomerId(customerId);
//        return new ResponseEntity<>(locations, HttpStatus.OK);
//    }

    @GetMapping("/customer/{customerId}/location-ids")
    public ResponseEntity<List<Long>> getLocationIdsByCustomerId(@PathVariable Long customerId) {
        List<Long> locationIds = locationService.findLocationIdsByCustomerId(customerId);
        return new ResponseEntity<>(locationIds, HttpStatus.OK);
    }

    @PostMapping("/add/{id}")
    public ResponseEntity<Location> add_location_customer(@RequestBody Location location ,@PathVariable("id" )Long id) {
        // Add a new location using the location  Service
        System.out.println(location);
        Location newlocation = locationService.add_location_customer(location,id);
        // Return the newly added location and the status code 201 (CREATED)
        return new ResponseEntity<>(newlocation, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCustomer(@PathVariable("id") Long id) {
        locationService.deleteCustomerById(id);
    }

}