import { Component, OnInit } from '@angular/core';
import {UserJob} from "../shared/domain/UserJob";
import {ScoreService} from "../shared/services/score.service";
import {ActivatedRoute} from "@angular/router";
import {UserJobService} from "../shared/services/UserJobService";

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.scss'],
})
export class EvaluateComponent implements OnInit {

  userJob: UserJob = new UserJob();
  userJobId: number;
  constructor(private scoreService: ScoreService, private routerinfo: ActivatedRoute, private userJobService: UserJobService) {

  }

  ngOnInit() {}

  ionViewWillEnter() {

    this.routerinfo.params.subscribe(par => {
      this.userJobId = par['userJobId'];
      this.userJobService.useJob(this.userJobId).subscribe(it => {
        this.userJob = it;
      });

    });
  }

  addScore() {
    this.scoreService.savaScore(this.userJob.score).subscribe(it => {
        this.userJob.score = it;
        this.userJobService.saveUserJob(this.userJob);
    })
  }

}
