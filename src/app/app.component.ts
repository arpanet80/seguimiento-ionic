import { CommonModule } from '@angular/common';
import { Component, OnInit, Optional, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonAvatar, IonText, Platform, ToastController, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, heartCircle, menuOutline, person, settings, settingsOutline, settingsSharp } from 'ionicons/icons';
import { Network, ConnectionStatus } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader,
    IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet,IonAvatar, IonText,
  ],
})
export class AppComponent implements OnInit  {

  private toastCtrl = inject(ToastController);
  private alertCtrl = inject( AlertController);
  private platform = inject( Platform);
  public alertController  = inject( AlertController);

  tap = 0;


  public appPages = [
    { title: 'Inicio', url: '/pages/home', icon: 'archive' },
    { title: 'Despliegue', url: '/pages/despliegue', icon: 'paper-plane' },
    { title: 'Configuracion', url: '/pages/config', icon: 'settings' },
  ];

  constructor(@Optional() private routerOutlet?: IonRouterOutlet) {
    //https://ionic.io/ionicons/v4
    addIcons({ person, settingsOutline,settings, settingsSharp, heartCircle, menuOutline, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });

    this.platform.ready().then(() => {
      this.exitAppOnDoubleTap();
      // this.exitAppOnAlert();
    });
  }

  ngOnInit(): void {
    if (Network) {
      Network.getStatus().then((status)=>{

        if ( !status.connected ) {
          this.exitSinInternet();
        }

        // this.networkStatus = status;
        // console.log('Network status Appcomponent:', status);
      })
    }

    Network.addListener('networkStatusChange', status => {
      // this.networkStatus = status;
      if (!status.connected) {
        this.notificaSinInternet(status.connected);
      }
      console.log('Cambio Appcomponent:', status);
    });
  }

  async exitSinInternet() {
    const alert = await this.alertCtrl.create({
      header: "Error!",
      subHeader: "Sin internet",
      message: "No se detecto una conexion a internet, la aplicacion requiere estar conectada",
      buttons: [
        /*{
          text: 'NO',
          role: 'cancel'
        },*/
        {
          text: 'OK',
          role: 'confirm',
          handler: () => { App.exitApp(); }
        }
      ],
    });
    alert.present();
  }

  async notificaSinInternet(msg: any) {
    const alert = await this.alertCtrl.create({
      header: msg +" Error!",
      subHeader: "Sin internet",
      message: "Perdio conexion a internet, la aplicacion no funcionara correctamente si no se vuelve a conectar",
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          // handler: () => { App.exitApp(); }
        }
      ],
    });
    alert.present();
  }




  /*async checkNetwork() {
    // const status2 = await Network.getStatus();
    const {connected, connectionType} = await Network.getStatus();
    const status = connected ? 'Online' : 'Offline';

    //'wifi' | 'cellular' | 'none' | 'unknown'
    const networkType = connectionType;

    console.log("Danteeee", status);

    Network.addListener('networkStatusChange', networkStatus => {
      const {connected, connectionType} = networkStatus;
      let status2 = connected ? 'Online' : 'Offline';

      //'wifi' | 'cellular' | 'none' | 'unknown'
      const networkType = connectionType;
      console.log("Danteeee Listener", status2);
 });

  }
*/


  exitAppOnAlert() {
    if(Capacitor.getPlatform() == 'android') {
      this.platform.backButton.subscribeWithPriority(10, async() => {
        if (!this.routerOutlet?.canGoBack()) {
          this.alertExit();
        }
      });
    }
  }

  exitAppOnDoubleTap() {
    if(Capacitor.getPlatform() == 'android') {
      this.platform.backButton.subscribeWithPriority(10, async() => {
        if (!this.routerOutlet?.canGoBack()) {
            // double tap exit
            this.tap++;
            if(this.tap == 2) App.exitApp();
            else {
              this.doubleTapExitToast();
            }
        }
      });
    }
  }

  async doubleTapExitToast() {
    console.log('doubletapexit was called!');
    let toast = await this.toastCtrl.create({
      message: 'Pulse nuevamente para salir',
      duration: 3000,
      position: 'bottom',
      icon:  "warning-outline",
      // <ion-icon name="exit-outline"></ion-icon>
      // <ion-icon name="mail-open-outline"></ion-icon>
      // color: 'primary'
    });
    toast.present();
    const dismiss = await toast.onDidDismiss();
    if(dismiss) {
      console.log('dismiss: ', dismiss);
      this.tap = 0;
    }
  }

  async alertExit() {
    console.log('alert');
    const alert = await this.alertCtrl.create({
      header: 'Exit App',
      subHeader: 'Confirm',
      message: 'Are you sure you want to exit the App?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel'
        },
        {
          text: 'YES',
          role: 'confirm',
          handler: () => { App.exitApp(); }
        }
      ],
    });
    alert.present();
  }



}
