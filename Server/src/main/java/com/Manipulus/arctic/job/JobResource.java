package com.Manipulus.arctic.job;


import com.Manipulus.arctic.job.model.Job;
import com.Manipulus.arctic.job.service.JobService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/job")
public class JobResource {
    private final JobService jobService;

    public JobResource(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Job>> getAllJob(){
        List<Job> jobs = jobService.findAllJobs();
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }



    @PostMapping("/add")
    public ResponseEntity<Job> addCustomer(@RequestBody Job job){
        Job newJob = jobService.addJob(job);
        return new ResponseEntity<>(newJob, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Job> updateJob(@RequestBody Job job){
        Job updateJob = jobService.updateJob(job);
        return new ResponseEntity<>(updateJob, HttpStatus.CREATED);
    }


    @DeleteMapping ("/delete/{id}")
    public void deleteJobById(@PathVariable("id") Long id){
        jobService.deleteJobById(id);
    }



//        return new ResponseEntity<>(HttpStatus.OK);


//    @DeleteMapping("/employees/{id}")
//    public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable long id){
//        Employee emp = emp_repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: "+id));
//
//        emp_repo.delete(emp);
//        Map<String,Boolean> response = new HashMap<>();
//        response.put("Deleted",Boolean.TRUE);
//        return ResponseEntity.ok(response);
//    }

}
