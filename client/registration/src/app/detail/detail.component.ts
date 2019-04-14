import { JobService } from './../shared/services/JobService';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserJobService } from '../shared/services/UserJobService';
import { UserJob } from '../shared/domain/UserJob';
import { Job } from '../shared/domain/Job';
import { User } from '../shared/domain/User';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  id;
  state;
  jobObj = new Job();
  joiner = [];
  user = new User();

  constructor(
    private route: ActivatedRoute,
    private job: JobService,
    private userJob: UserJobService
  ) {
  }

  applyJob() {
    const userJob = new UserJob({
      id: 0,
      job: this.jobObj,
      user: this.user,
      state: 1,
      score: null
    });
    this.userJob.saveUserJob(userJob).subscribe(it => console.log(it));
  }

  ngOnInit() {
    const jobId = this.route.snapshot.params['jobId'].split('$');
    this.id = +jobId[0];
    this.state = +jobId[1];

    this.job.getDetailById(this.id).subscribe(it => this.jobObj = it);
    this.userJob.jobUsers(this.id).subscribe(it => {
      this.joiner = it;
      it.forEach(val => {
        if (val.user.id === this.user.id) {
          this.state = 4;
        }
      });
    });
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
