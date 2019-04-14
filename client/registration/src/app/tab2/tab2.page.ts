import { Component, OnInit } from '@angular/core';
import { MessageService } from '../shared/services/message.service';
import { AuthService } from '../shared/services/auth.service';
import { UserJobService } from '../shared/services/UserJobService';
import { JobService } from '../shared/services/JobService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  selectTab = 1;

  mySend = [];
  myJoin = [];
  user = {};

  constructor(
    public userJob: UserJobService,
    public job: JobService,
    public router: Router
  ) {
  }

  changeTab(e) {
    this.selectTab = e;
  }

  clickItem(item, state) {
    this.router.navigate(['/detail', item.id + '$' + state]);
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.userJob.useJobs(this.user.id).subscribe(it => this.myJoin = it);
    this.job.userPost(this.user.id).subscribe(it => this.mySend = it);
  }

  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem('userVM'));
    // this.messageService.getContacts(this.user.id).subscribe(it => {
    //   console.log(it);
    //   this.contacts = it;
    // });
  }


}
