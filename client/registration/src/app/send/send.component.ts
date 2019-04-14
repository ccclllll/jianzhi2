import { Component, OnInit } from '@angular/core';
import {Job} from "../shared/domain/Job";
import {JobService} from "../shared/services/JobService";
import {AlertController, LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],
})
export class SendComponent implements OnInit {

  post = new Job();

  constructor(private jobService: JobService,public loadingController: LoadingController,
    public alertController: AlertController) { }

  ngOnInit() {}

  async addJob(){

      const loading = await this.loadingController.create({
          message: '发布中',
          duration: 2000
      });
      await loading.present();

    this.jobService.addJob(this.post).subscribe(it=>{
        loading.dismiss();
        this.presentAlert('发布成功!');
    },err => {
      this.presentAlert('发布失败，请检查网络！');
    })
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
