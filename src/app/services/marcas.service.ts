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

   

    
    const headers = new HttpHeaders({
      "x-token": token
    });

    this.paginaMarcas++;

    return this.http.get<RespuestaMarcas>(
      `${URL}/marca/?pagina=${this.paginaMarcas}`,
      { headers }
    );
  }
}
