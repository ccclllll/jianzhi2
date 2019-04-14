package com.shnu.part.web.api;

import com.shnu.part.domain.Job;
import com.shnu.part.repositiry.JobRepository;
import com.shnu.part.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Null;
import java.util.List;

@RequestMapping("/api")
@RestController
public class JobResource {
    @Autowired
    private JobService jobService;
    @Autowired
    private JobRepository jobRepository;
    @GetMapping("user_post")
    public ResponseEntity<List<Job>> userPost(@RequestParam Long id){
        return new ResponseEntity<>(jobService.userPost(id), HttpStatus.OK);
    }

    @GetMapping("/job/{id}")
    public ResponseEntity<Job> job(@PathVariable(value = "id") Long id){
        Job job = null;
        if(jobRepository.findById(id).isPresent()){
            job = jobRepository.findById(id).get();
        }
        return new ResponseEntity<>(job,HttpStatus.OK);
    }

    @PostMapping("job")
    public ResponseEntity<Job> saveJob(@RequestBody Job job){
        return new ResponseEntity<>(jobService.saveJob(job),HttpStatus.OK);
    }

    @DeleteMapping("job")
    public ResponseEntity<Void> deleteJob(@RequestParam Long jobId){
        jobService.deleteJob(jobId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("jobs")
    public ResponseEntity<List<Job>> jobs(@RequestParam String jobState){
        return new ResponseEntity<>(jobRepository.findAllByJobState(jobState),HttpStatus.OK);
    }

}
