import { JobService } from './../shared/services/JobService';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserJobService } from '../shared/services/UserJobService';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  id;
  state;
  jobObj = {};
  joiner = [];
  user = {};

  constructor(
    private route: ActivatedRoute,
    private job: JobService,
    private userJob: UserJobService
  ) {
    const jobId = this.route.snapshot.params['jobId'].split('$');
    this.id = +jobId[0];
    this.state = +jobId[1];

    this.job.getDetailById(this.id).subscribe(it => this.jobObj = it);
    this.userJob.jobUsers(this.id).subscribe(it => this.joiner = it);
  }

  applyJob() {
    console.log(1);
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
