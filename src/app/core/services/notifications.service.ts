import { Injectable, inject } from '@angular/core';
import { AlertController, IonApp, IonRouterOutlet, Platform, ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private toastCtrl = inject(ToastController);
  public alertController  = inject( AlertController);

  constructor() { }

  async showToast(message: any) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      icon:  "logo-ionic",
      // color: 'primary'
    });
    toast.present();
  }

  async showAlert(header: string, subtitle: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subtitle,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showAlertOk(header: string, subtitle: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subtitle,
      message: message,
      buttons: [
        {
          text: 'NO',
          role: 'cancel'
        },
        {
          text: 'SI',
          role: 'confirm',
          // handler: () => { App.exitApp(); }
        }
      ],
    });
    await alert.present();
  }

}
