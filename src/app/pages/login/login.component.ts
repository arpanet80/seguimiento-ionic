import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/core/pages/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:  true,
  imports: [ HeaderComponent ]
})
export class LoginComponent   {

  constructor() { }


}
