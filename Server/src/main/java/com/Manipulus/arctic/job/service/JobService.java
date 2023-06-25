package com.Manipulus.arctic.job.service;

import com.Manipulus.arctic.customer.exception.CustomerNotFoundException;
import com.Manipulus.arctic.customer.model.Customer;
import com.Manipulus.arctic.job.exception.JobNotFoundException;
import com.Manipulus.arctic.job.model.Job;
import com.Manipulus.arctic.job.repository.JobRepository;
import com.Manipulus.arctic.location.model.Location;
import com.Manipulus.arctic.location.repository.locationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class JobService {
    private final com.Manipulus.arctic.job.repository.JobRepository JobRepository;
    private final com.Manipulus.arctic.location.repository.locationRepository locationRepository;
    @Autowired
    public JobService(JobRepository jobRepository , locationRepository locationRepository) {
        this.JobRepository = jobRepository;
        this.locationRepository = locationRepository;
    }

    public Location findLocationById(Long id){
        // Find the customer with the given ID in the database
        // Throw a CustomerNotFoundException if the customer is not found
        return locationRepository.findLocationById(id)
                .orElseThrow(()-> new CustomerNotFoundException(" Location by id"+ id + "was not found"));
    }

    public Job addJob(Job job, Long id) {
        job.setJobCode(UUID.randomUUID().toString());
        job.setLocation(findLocationById(id));
        job.setJob_status("Not Complete");
        return JobRepository.save(job);
    }

    public List<Job> findAllJobs() {
        return JobRepository.findAll();
    }

    public Job updateJob(Job job, Long id) {
        job.setLocation(findLocationById(id));
        job.setJob_status("Not Complete");
        return JobRepository.save(job);
    }
    public Job findJobById(Long id){
        // Find the customer with the given ID in the database
        // Throw a CustomerNotFoundException if the customer is not found
        return JobRepository.findJobById(id)
                .orElseThrow(()-> new CustomerNotFoundException(" job by id"+ id + "was not found"));
    }



    @Transactional
    public void deleteJobById(Long id) {
        JobRepository.deleteJobById(id);
    }
}