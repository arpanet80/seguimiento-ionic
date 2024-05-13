import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/core/pages/header/header.component';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
  standalone:  true,
  imports: [ HeaderComponent ]
})
export class ConfiguracionComponent { //}  implements OnInit {

  constructor() { }

  // ngOnInit() {}

}
