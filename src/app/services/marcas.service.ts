import { Injectable, EventEmitter, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { UsuarioService } from "./usuario.service";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer/ngx";
import { RespuestaMarcas, Marca } from "../interfaces/interfaces";
import { Storage } from "@ionic/storage";

const URL = environment.url;

@Injectable({
  providedIn: "root"
})
export class MarcasService  {

  token = '';




  paginaMarcas = 0;

  nuevaMarca = new EventEmitter<Marca>();

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private fileTransfer: FileTransfer,
    private storage: Storage,
  ) {}

   getPosts(pull: boolean = false, token:string) {
    console.log('me viene por parametro el token', token);
    if (pull) {
      this.paginaMarcas = 0;
    }
    console.log('el valor de paginas es', this.paginaMarcas);
    this.paginaMarcas++;
    console.log('el valor de paginas sumado 1 es', this.paginaMarcas);
   

    
    const headers = new HttpHeaders({
      "x-token": token
    });

    

    return this.http.get<RespuestaMarcas>(
      `${URL}/marca/?pagina=${this.paginaMarcas}`,
      { headers }
    );
  }


  crearMarca( marca ) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise( resolve => {

      this.http.post(`${ URL }/marca`, marca, { headers })
        .subscribe( resp => {

          this.nuevaMarca.emit( resp['marca'] );
          resolve(true);
        });
    });



  }


  subirImagen( img: string ) {

    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.usuarioService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload( img, `${ URL }/marca/upload`, options )
      .then( data => {
        console.log(data);
      }).catch( err => {
        console.log('error en carga', err);
      });

  }
}
