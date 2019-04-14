import { Component, OnInit } from '@angular/core';
import {Job} from "../shared/domain/Job";
import {JobService} from "../shared/services/JobService";
import {AlertController, LoadingController} from "@ionic/angular";
import {User} from "../shared/domain/User";

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],
})
export class SendComponent implements OnInit {

  post = new Job();

  user: User;
  constructor(private jobService: JobService,public loadingController: LoadingController,
    public alertController: AlertController) { }

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
      this.post.jobState = '有效';
    this.jobService.addJob(this.post).subscribe(it => {
        loading.dismiss();
        this.presentAlert('发布成功!');
    }, err => {
      this.presentAlert('发布失败，请检查网络！');
    });
  }


    async presentAlert(text) {
        const alert = await this.alertController.create({
            header: '消息',
            message: text,
            buttons: ['确认']
        });

        await alert.present();
    }

}
