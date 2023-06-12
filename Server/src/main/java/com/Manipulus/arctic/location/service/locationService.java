package com.Manipulus.arctic.location.service;

import com.Manipulus.arctic.location.model.location;
import com.Manipulus.arctic.location.repository.locationRepository;
import com.Manipulus.arctic.customer.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class locationService {
    private final locationRepository locationRepository;


    @Autowired
    public locationService(locationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public location addlocation(location location, Long id) {
        location.setlocationCode(UUID.randomUUID().toString());
        return locationRepository.save(location);
    }

    public List<location> findAlllocations() {
        return locationRepository.findAll();
    }
}
