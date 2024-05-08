import { Component, OnInit, inject } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone:  true,
  imports: [ IonToolbar, IonTitle, IonButtons, IonMenuButton, IonButton, IonIcon, IonHeader, IonBackButton ]
})
export class HeaderComponent {  //}  implements OnInit {

  private meta = inject(Meta);
  public  router = inject(Router);
  titulo!: string;

  constructor() {
    this.getDataRoute()
    .subscribe( (data:any) => {
      this.titulo = data['titulo'];

      /// Agrega un metatag en el head con descripcion de la pagina
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };
      this.meta.updateTag(metaTag);
    });
  }


  getDataRoute(){
    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd),
      filter( ( evento: any) =>evento.snapshot.firstChild === null ),
      map( (evento: ActivationEnd) => evento.snapshot.data )
    )
  }

}
