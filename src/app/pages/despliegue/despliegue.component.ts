import { animation } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild, inject } from '@angular/core';
import { WayPoint } from 'src/app/core/interfaces';
import { Recinto } from 'src/app/core/interfaces/tecnico.interface';
import { HeaderComponent } from 'src/app/core/pages/header/header.component';
import { ApiService } from 'src/app/core/services/api.service';

declare var google: any;

@Component({
  selector: 'app-despliegue',
  templateUrl: './despliegue.component.html',
  styleUrls: ['./despliegue.component.scss'],
  standalone:  true,
  imports: [ HeaderComponent ]
})
export class DespliegueComponent implements AfterViewInit, OnDestroy { //}  implements OnInit {

  private renderer = inject(Renderer2);
  private apiService = inject( ApiService );

  @ViewChild('map', {static: true}) mapElementRef!: ElementRef;

  map: any;
  marker: any;
  mapListener: any;
  markerListener: any;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  puntosDeRuta: WayPoint[] = [];
  recintosTecnico: Recinto[] = [];
  tribunalElectoralPoint  =  {lat: -19.577337590136207, lng: -65.75577817299181 };         //TED

  constructor() { }

  ngAfterViewInit() {

    this.apiService.getTecnico(11).subscribe((res: any) => {

      this.recintosTecnico = res.recintos;

      console.log(this.recintosTecnico);

      this.recintosTecnico.forEach((element: any) => {
        this.puntosDeRuta.push( { location: { lat: Number(element.latitud), lng: Number(element.longitud) }, stopover: true,} as WayPoint );
      });

      // this.singleMap();

      this.loadMap();

      this.addMarker(this.tribunalElectoralPoint);




    });

  }

  async singleMap() {

    var mapOptions = {
      center: this.tribunalElectoralPoint,
        zoom: 17,
        mapId: "4504f8b37365c3d0",
        disableDefaultUI: true,          // Esconde el controlador de zoom del mapa
    }
    this.map = new google.maps.Map(this.mapElementRef.nativeElement, mapOptions);
    this.renderer.addClass(this.mapElementRef.nativeElement, 'visible');

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(this.map);


    var request = {
      origin: this.tribunalElectoralPoint,
      destination: this.tribunalElectoralPoint,
      waypoints:          this.puntosDeRuta,
      optimizeWaypoints:  true,
      travelMode: 'DRIVING'
    };

    directionsService.route(request, function(result: any, status: string) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    });

  }


  async loadMap() {
    try {

      const mapEl = this.mapElementRef.nativeElement;
      const { Map } = await google.maps.importLibrary("maps");

      this.map = new Map(mapEl, {
        center: this.tribunalElectoralPoint,
        zoom: 17,
        mapId: "4504f8b37365c3d0",
        disableDefaultUI: true,          // Esconde el controlador de zoom del mapa
        // scaleControl: false,
        // streetViewControl: false,
        // zoomControl: false,
        // overviewMapControl: false,
        // mapTypeControl: false,
        // fullscreenControl: false,
      });
      this.renderer.addClass(mapEl, 'visible');


      this.calculateRoute();

      // this.addMarker(this.tribunalElectoralPoint);

      // Map listeners
      this.mapListener = this.map.addListener("click", (event: any) => {
        this.map.panTo(event.latLng);         /// Centra donde hace click
        console.log(event.latLng.lat());
      });

    } catch(e) {
      console.log(e);
    }
  }

  private calculateRoute() {

    this.directionsDisplay.setMap(this.map);

    this.directionsService.route({
      origin:             this.tribunalElectoralPoint,
      destination:        this.tribunalElectoralPoint,
      waypoints:          this.puntosDeRuta,
      optimizeWaypoints:  true,
      travelMode:  'DRIVING'
    }, (
      response: any, status: string)  => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  async addMarker(location: any) {

    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    /// Configura el icono ////////////////
    const markerIcon = document.createElement('img');
    markerIcon.src = 'assets/imgs/oep.png';
    markerIcon.height = 50;
    markerIcon.width = 50;

    ////// Aplica el arquer //////////
    this.marker = new AdvancedMarkerElement({
      map: this.map,
      position: location,
      gmpDraggable: false,
      content: markerIcon
    });

    // listeners
    this.markerListener = this.marker.addListener("click", (event: any) => {
      // this.map.panTo(event.latLng);
      console.log("Click en marcador:", event.latLng.lat());
    });




  }

  ngOnDestroy(): void {
    if(this.mapListener) {
      google.maps.event.removeListener(this.mapListener);
      this.mapListener = null;
    }
    if(this.markerListener) {
      this.marker.removeEventListener('dragend', this.markerListener);
      this.markerListener = null;
    }

    console.log('marker listener: ', this.markerListener);
    console.log('map listener: ', this.mapListener);
  }


}
