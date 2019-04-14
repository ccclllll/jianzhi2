package com.shnu.part.web.api;

import com.shnu.part.domain.Score;
import com.shnu.part.repositiry.ScoreRepository;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api")
@RestController
public class ScoreResource {
    @Autowired
    private ScoreRepository scoreRepository;
    @PostMapping("score")
    @ApiOperation(value = "增加或更新评分，增加时id字段为0")
    public ResponseEntity<Score> saveScore(@RequestBody Score score){
        return new ResponseEntity<>(scoreRepository.save(score), HttpStatus.OK);
    }
}
