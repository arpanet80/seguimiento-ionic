import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tecnico } from '../interfaces/tecnico.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject( HttpClient );
  private url = `${environment.apiUrl}`;

  constructor() { }

  getTecnico(idpersonal: number): Observable<Tecnico> {
    return this.http.get(`${this.url}recintos/${idpersonal}`)
      .pipe<Tecnico>(map((data: any) => data));
  }

}
