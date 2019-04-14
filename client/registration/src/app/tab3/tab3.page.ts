import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/domain/User';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  // user = JSON.parse(localStorage.getItem('userVM'));
  icon = 'create';
  edit = false;

  user = {
    id: '',
    bornDate: '',
    username: '',
    phone: '',
    password: '',
    school: '',
    img: '',
    state: '',
    sex: '',
    bornData: ''
  };

  constructor(
    public auth: AuthService,
    public router: Router) {

  }

  clickIcon(e) {
    this.edit = !this.edit;

    if (this.edit) {
      this.icon = 'save';
    } else {
      this.icon = 'create';
      const user = new User(this.user);

      this.auth.updateUser(user).subscribe(it => localStorage.setItem('user', JSON.stringify(it)));
    }
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  // logout() {
  //   this.auth.clearToken();
  //   this.router.navigate(['']);
  // }

  // ionViewWillEnter() {
  //   this.user = JSON.parse(localStorage.getItem('userVM'));
  // }
}
