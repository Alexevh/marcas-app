import { Component } from "@angular/core";
import { MarcasService } from "../../services/marcas.service";
import { Router } from "@angular/router";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

declare var window: any;

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  tempImages: string[] = [];
  cargandoGeo = false;

  marca = {
    mensaje: "",
    coords: null,
    posicion: false,
    tipo: 'Entrada',
    estado: 'Enviada'
  };

  constructor(
    private marcaService: MarcasService,
    private route: Router,
    private geolocation: Geolocation,
    private camera: Camera
  ) {}

  async crearMarca() {
    console.log(this.marca);
    const creado = await this.marcaService.crearMarca(this.marca);

    this.marca = {
      mensaje: "",
      coords: null,
      posicion: false,
      tipo: 'Entrada',
      estado: 'Enviada'
    };

    this.tempImages = [];

    this.route.navigateByUrl("/main/tabs/tab2");
  }

  getGeoLocation() {
    if (!this.marca.posicion) {
      this.marca.coords = null;
      return;
    }

    this.cargandoGeo = true;

    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        // resp.coords.latitude
        // resp.coords.longitude
        this.cargandoGeo = false;

        const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
        console.log(coords);
        this.marca.coords = coords;
      })
      .catch(error => {
        console.log("Error getting location", error);
        this.cargandoGeo = false;
      });
  }

  tomarFoto() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.procesarImagen(options);
  }

  libreria() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen(options);
  }

  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):

        const img = window.Ionic.WebView.convertFileSrc(imageData);

        this.marcaService.subirImagen(imageData);
        this.tempImages.push(img);
      },
      err => {
        // Handle error
      }
    );
  }

  marcarEntrada(){
    this.marca.tipo = 'Entrada';
  }

  marcarSalida(){
    this.marca.tipo = 'Salida';
  }
 
  
}
