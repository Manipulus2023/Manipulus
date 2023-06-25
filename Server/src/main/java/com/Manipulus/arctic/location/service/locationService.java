package com.Manipulus.arctic.location.service;

import com.Manipulus.arctic.customer.exception.CustomerNotFoundException;
import com.Manipulus.arctic.customer.model.Customer;
import com.Manipulus.arctic.job.model.Job;
import com.Manipulus.arctic.job.repository.JobRepository;
import com.Manipulus.arctic.location.model.Location;
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
    private final com.Manipulus.arctic.customer.repository.CustomerRepository CustomerRepository;


    @Autowired
    public locationService(locationRepository locationRepository  , CustomerRepository CustomerRepository) {
        this.locationRepository = locationRepository;
        this.CustomerRepository = CustomerRepository;
    }

    public Customer findCustomerById(Long id){
        // Find the customer with the given ID in the database
        // Throw a CustomerNotFoundException if the customer is not found
        return CustomerRepository.findCustomerById(id)
                .orElseThrow(()-> new CustomerNotFoundException(" customer by id"+ id + "was not found"));
    }

    public Location add_location_customer(Location location , Long id) {
        location.setlocationCode(UUID.randomUUID().toString());
        location.setLocation_customer(findCustomerById(id));
        return locationRepository.save(location);
    }

//    public List<location> findLocationsByCustomerId(Long customerId) {
//        return locationRepository.findByLocation_customerId(customerId);
//    }
public List<Long> findLocationIdsByCustomerId(Long customerId) {
    return locationRepository.findLocationIdsByCustomerId(customerId);
}


    public Location findLocationById(Long id){
        // Find the customer with the given ID in the database
        // Throw a CustomerNotFoundException if the customer is not found
        return locationRepository.findLocationById(id)
                .orElseThrow(()-> new CustomerNotFoundException(" Location by id"+ id + "was not found"));
    }

    public List<Location> findAlllocations() {
        return locationRepository.findAll();
    }

    @Transactional
    public void deleteCustomerById(Long id){
        CustomerRepository.deleteCustomerById(id);
    }
}
