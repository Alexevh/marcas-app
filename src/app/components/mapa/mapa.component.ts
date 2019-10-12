import { Component, OnInit, Input, ViewChild } from '@angular/core';
declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coords: string;

  /* como el mapbox llama al div por el ID se mezclan los mapas ya que todos los posts en la pagiann tienen el mismo id y solo d
  deberian tener uno, entonces le pasamos el objeto div por fereneci y lo arreglamos asi */
  @ViewChild('mapa', {static: true}) mapa;
  
    constructor() {}
  
    ngOnInit() {
  
      /*obtengo las coordenadas, me viene en un string asi 34.5555, 45.555, con este comando genero un array de
      dos posiciones cofrtando por la coma, en la 0 tengo la latitud y en la 1 la longitud */
      const latlng = this.coords.split(',');
  
      /* las paso a numero ya que el mapbox requiere numeros en vez de strings */
      const lat = Number(latlng[0]);
      const lng = Number(latlng[1]);

      const lat2= '-34.8258949'
      const lng2= '-56.3404545'
  
  
      mapboxgl.accessToken =
        "pk.eyJ1IjoiYWxleGV2aCIsImEiOiJjazFka3N5eG8wNTB2M21tdXRqNG5vbTk1In0.pp6ZFJZpaN-slvx6b4gL_A";
      const  map = new mapboxgl.Map({
        container: this.mapa.nativeElement,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng2, lat2],
        zoom: 15
      });
  
      /* genero el marcador en las coordenadas */
      const marker = new mapboxgl.Marker().setLngLat([lng2, lat2]).addTo(map);
    }

}
