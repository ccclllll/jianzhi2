import { Component, OnInit } from '@angular/core';
import {Job} from "../shared/domain/Job";
import {JobService} from "../shared/services/JobService";
import {AlertController, LoadingController} from "@ionic/angular";
import {User} from "../shared/domain/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],
})
export class SendComponent implements OnInit {

  post = new Job();

  user: User;
  constructor(private jobService: JobService,public loadingController: LoadingController,
    public alertController: AlertController,public router: Router) { }

  ngOnInit() {

      this.user = JSON.parse(localStorage.getItem('user'));
  }

  async addJob() {
      const loading = await this.loadingController.create({
          message: '发布中',
          duration: 2000
      });
      await loading.present();

      this.post.user = this.user;
      this.post.updateTime = new Date().toJSON();
      this.post.jobState = 'active';
      this.jobService.addJob(this.post).subscribe(it => {
        loading.dismiss();
        this.post = it;
        this.presentSuccessAlert('发布成功!');
    }, err => {
        alert('发生未知错误');
    });
  }


    async presentSuccessAlert(text) {
        const alert = await this.alertController.create({
            header: '消息',
            message: text,
            buttons: [{
                text: '继续发布',
                handler: () => {
                    this.post = new Job();
                }
            }, {
                text: '查看',
                handler: () => {
                    this.router.navigate(['detail', this.post.id]);
                }
            }],
        });
        await alert.present();
    }

}
