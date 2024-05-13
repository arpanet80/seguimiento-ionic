import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonApp, IonRouterOutlet, Platform, ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private toastCtrl = inject(ToastController);
  public alertController  = inject( AlertController);
  private router = inject( Router );


  constructor() { }

  async showToast(message: any) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      // icon:  "logo-ionic",
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

  async showAlertConfirm() {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Error en la peticion HTTP',
      buttons: [
        /*{
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, */
        {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['/']);
          }
        }
      ],
      backdropDismiss: false,
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
