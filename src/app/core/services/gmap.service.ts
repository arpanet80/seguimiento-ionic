import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GmapService {

  constructor() { }

  loadGoogleMaps(): Promise<any> {
    const win = window as any;
    const gModule = win.google;
    if(gModule && gModule.maps) {
     return Promise.resolve(gModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =  "https://maps.googleapis.com/maps/api/js?key=AIzaSyD1AlUHQTpFng3TsXh1vUUNT-6un7IuBfQ&amp;libraries=marker&amp;language=en&amp;callback=Function.prototype&amp;loading=async";

        /*script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        environment.googleMapsApiKey + '&callback=Function.prototype';
        */
        // &loading=async     agregando a la api no funciona
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if(loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google Map SDK is not Available');
        }
      };
    });
  }
}
