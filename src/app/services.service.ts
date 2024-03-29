import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }
  async presentAlert(msg:any) {
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: msg,
      buttons: [
        {
          text: 'Ok',
        },
        ],
      
    });

    await alert.present();
  }
  
  async showLoading(msg:any) {
    const loading = await this.loadingCtrl.create({
      message: msg,
      spinner: 'circles',
    });

    loading.present();
  }

  dismissLoader(){
    this.loadingCtrl.dismiss();
  }
}
