package com.Manipulus.arctic.location.service;

import com.Manipulus.arctic.customer.exception.CustomerNotFoundException;
import com.Manipulus.arctic.job.model.Job;
import com.Manipulus.arctic.job.repository.JobRepository;
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
    private final com.Manipulus.arctic.job.repository.JobRepository JobRepository;


    @Autowired
    public locationService(locationRepository locationRepository , JobRepository jobRepository ) {
        this.locationRepository = locationRepository;
        this.JobRepository = jobRepository;
    }

    public Job findJobById(Long id){
        // Find the customer with the given ID in the database
        // Throw a CustomerNotFoundException if the customer is not found
        return JobRepository.findJobById(id)
                .orElseThrow(()-> new CustomerNotFoundException(" job by id"+ id + "was not found"));
    }

    public location addlocation(location location ,Long id) {
        location.setlocationCode(UUID.randomUUID().toString());
        location.setLocation_info(findJobById(id));
        return locationRepository.save(location);
    }

    public List<location> findAlllocations() {
        return locationRepository.findAll();
    }
}
