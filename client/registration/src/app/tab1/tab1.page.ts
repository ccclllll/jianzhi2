import { JobService } from './../shared/services/JobService';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../shared/services/registration.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  registrations = [];
  allJob = [];

  user: any = {};
  constructor(
    public router: Router,
    public registrationService: RegistrationService,
    public job: JobService
  ) {
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.job.jobs('active').subscribe(it => {
      this.allJob = it;
    });
  }

  clickItem(item) {
    this.router.navigate(['/detail', item.id + '$1']);
  }
}
