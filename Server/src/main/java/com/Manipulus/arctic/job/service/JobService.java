package com.Manipulus.arctic.job.service;

import com.Manipulus.arctic.job.exception.JobNotFoundException;
import com.Manipulus.arctic.job.model.Job;
import com.Manipulus.arctic.job.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class JobService {
    private final com.Manipulus.arctic.job.repository.JobRepository JobRepository;

    @Autowired
    public JobService(JobRepository jobRepository) {
        this.JobRepository = jobRepository;
    }

    public Job addJob(Job job) {
        job.setJobCode(UUID.randomUUID().toString());
        return JobRepository.save(job);
    }

    public List<Job> findAllJobs() {
        return JobRepository.findAll();
    }

    public Job updateJob(Job job) {
        return JobRepository.save(job);
    }

    @Transactional
    public void deleteJobById(Long id) {
        JobRepository.deleteJobById(id);
    }
}
