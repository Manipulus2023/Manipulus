package com.Manipulus.arctic.location;

import com.Manipulus.arctic.location.model.location;

import com.Manipulus.arctic.location.model.location;
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
    public ResponseEntity<List<location>> getAlllocation() {
        // Get all locations using the locationService
        List<location> locations = locationService.findAlllocations();
        // Return the list of locations and the status code 200 (OK)
        return new ResponseEntity<>(locations, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<location> addlocation(@RequestBody location location , @RequestParam("id" )Long id) {
        // Add a new location using the location  Service
        location newlocation = locationService.addlocation(location, id);
        // Return the newly added location and the status code 201 (CREATED)
        return new ResponseEntity<>(newlocation, HttpStatus.CREATED);
    }


}