import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from "@ionic/storage";
import { environment } from '../../environments/environment.prod';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  token: string = null;
  private usuario: Usuario;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

 /* el login devuelve una promesa y guarda el token */
 login(email: string, password: string) {

  console.log('entro al login');
  return new Promise(resolve => {
    /* el post requiere datos en el body, le podria poner {email: email, passsword: password} pero no es necesario
    en ECS6 */
    const data = { email, password };

    /* hacemos la llamada post y nos suscribimos */
    this.http.post(`${URL}/login`, data).subscribe(async resp => {
      /* si ok viene en true */
      if (resp["ok"]) {
        await this.guardarToken(resp["token"]);
        console.log('devolvio OK');
        resolve(true);
      } else {
        console.log('devolvio false');
        this.token = null;
        this.storage.clear();
        resolve(false);
      }
    });
  });
}

logout(){
this.token = null;
this.usuario = null;
this.storage.clear();
this.navCtrl.navigateRoot('/login', {animated: true});
}


registro(usuario: Usuario) {
  console.log('entro a crear', usuario.email);
  return new Promise(resolve => {
    this.http.post(`${URL}/user/create`, usuario).subscribe(async resp => {
      console.log('se hizo bien', resp);

      if (resp["ok"] === true) {
        console.log('devolvio OK la rsspuesta');
        await this.guardarToken(resp["token"]);
        resolve(true);
      } else {
        this.token = null;
        this.storage.clear();
        console.log('devolvio mal');
        resolve(false);
      }
    });
  });
}

/* como el token es muy largo puede demorar y por eso es preferible hacerlo async el guardado */
async guardarToken(token: string) {
  this.token = token;
  await this.storage.set("token", token);
  await this.validaToken();
}

async validaToken(): Promise<boolean> {
  /*primero cargo el token */
  await this.cargarToken();

  /* si n hay token ni sigo, mando un false */
  if (!this.token) {
    this.navCtrl.navigateRoot("/login");
    return Promise.resolve(false);
  }

  /* voy a llamar al metodo del servicio que me trae el usuario a partir del tokem, el token se lo mando
  por los headers */
  const headers = new HttpHeaders({
    "x-token": this.token
  });

  return new Promise<boolean>(resolve => {
    this.http.get(`${URL}/user`, { headers }).subscribe(resp => {
      if (resp["ok"]) {
        this.usuario = resp["user"];
        console.log("estoy en validar token  me llega ", resp["user"]);
        resolve(true);
      } else {
        this.navCtrl.navigateRoot("/login");
        resolve(false);
      }
    });
  });
}

async cargarToken() {
  this.token = (await this.storage.get("token")) || null;
  //return this.token;
}

getUsuario() {
  /* al hacer esto en vez de retirnar el usuario destruyo la relacion entre el usuario y el objeto ya que 
  no quiero que en mi istema el valor del usuario en este js se cmabie hasta que el usuario haga click en actualizar */
  return { ...this.usuario };
}

actualizarUsuario(usuario: Usuario) {
  const headers = new HttpHeaders({
    "x-token": this.token
  });

  return new Promise<boolean>(resolve => {
    this.http
      .post(`${URL}/user/update`, usuario, { headers })
      .subscribe(resp => {
        if (resp['ok']) {
          /* actualizo el token */
          this.guardarToken(resp["token"]);
          resolve(true);
        } else {
          resolve(false);
        }
      });
  });
}

async obtenerToken(){
  return  await this.storage.get("token");
}


}
