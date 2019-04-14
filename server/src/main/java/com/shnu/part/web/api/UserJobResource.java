package com.shnu.part.web.api;

import com.shnu.part.domain.UserJob;
import com.shnu.part.repositiry.UserJobRepository;
import com.shnu.part.service.UserJobService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequestMapping("/api")
@RestController
public class UserJobResource {
    @Autowired
    private UserJobService userJobService;
    @Autowired
    private UserJobRepository userJobRepository;


    @GetMapping("/userjobs")
    @ApiOperation(value = "根据用户id查找用户参与的兼职")
    public ResponseEntity<List<UserJob>> userJobs(@RequestParam Long userId){
        return new ResponseEntity<>(userJobService.userJobs(userId), HttpStatus.OK);
    }

    @GetMapping("jobusers")
    @ApiOperation(value = "根据jobId获取参与该兼职的所有用户")
    public ResponseEntity<List<UserJob>> jobUsers(@RequestParam Long jobId){
        return new ResponseEntity<>(userJobService.jobUsers(jobId),HttpStatus.OK);
    }

    @GetMapping("userjob/{id}")
    public ResponseEntity<UserJob> userJob(@PathVariable(value = "id") Long id){

        UserJob userJob = null;
        try{

            userJob = userJobRepository.findById(id).get();

            return new ResponseEntity<>(userJob,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(userJob, HttpStatus.OK);
        }
    }

    @PostMapping("/userjob")
    public ResponseEntity<UserJob> saveUserJob(@RequestBody UserJob userJob){
        return new ResponseEntity<>(userJobRepository.save(userJob), HttpStatus.OK);
    }
}
