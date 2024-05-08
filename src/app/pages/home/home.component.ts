import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonGrid, IonButton, IonIcon, IonRow, IonLabel, IonItem, IonList, IonCol, IonText, IonSegment, IonSegmentButton, IonFab, IonTabButton, IonFabButton, IonItemGroup, IonThumbnail, IonNote, IonSearchbar, IonBackButton, IonAvatar, IonListHeader, IonProgressBar, IonChip, IonCardHeader, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/core/pages/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone:  true,
  imports: [
    IonCardSubtitle, IonCardTitle, IonCardContent, IonCardHeader, IonChip, IonProgressBar, IonListHeader,
    IonAvatar, IonSearchbar, IonNote, IonItemGroup, IonFabButton, IonFab, IonSegmentButton, IonSegment, IonCol,
    IonItem, IonLabel, IonRow, IonIcon, IonGrid, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent,
    IonButton, IonGrid, IonList, IonText, IonTabButton, IonThumbnail,
    IonToolbar, IonBackButton, IonAvatar, IonCard, IonCardContent,
    NgFor, RouterLink, HeaderComponent
  ]


})
export class HomeComponent { //} implements OnInit {

  private route = inject( Router );

  constructor() { }

  // ngOnInit() {}

  features: any[] = [
    {id: 1, name: 'Inicio', src: 'assets/icons/top-up.png', background: '#E2E9F1', ruta: '/pages/home'},
    {id: 2, name: 'Marcadores', src: 'assets/icons/cash-withdrawal.png', background: '#E2E9F1', ruta: '/pages/map'},
    {id: 3, name: 'Ruta Optima', src: 'assets/icons/send.png', background: '#E2E9F1', ruta: '/pages/rutas'},
    {id: 4, name: 'Tracking de Ubicacion', src: 'assets/icons/debit-card.png', background: '#E2E9F1', ruta: '/pages/tracking'},
  ];

  transactions: any[] = [
    {id: 1, vendor: 'Received from PhonePe', image: '', amount: 1500, time: '3:00PM'},
    {id: 2, vendor: 'Flaticons', image: '', amount: -1200, time: '4:00PM'}
  ];


  btnMenu() {
    alert("Aaaa");

  }

  nextpage( ruta: string) {
    console.log(ruta);
    this.route.navigate([ruta]);

  }

  getRandomColor()
  {
      var color = "#";
      for (var i = 0; i < 3; i++)
      {
          var part = Math.round(Math.random() * 255).toString(16);
          color += (part.length > 1) ? part : "0" + part;
      }
      return color;
  }


}
