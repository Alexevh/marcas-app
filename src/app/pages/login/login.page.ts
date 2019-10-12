import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/interfaces';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiserviceService } from 'src/app/services/uiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild("Slideprincipal", { static: true }) slide: IonSlides;

  /* elemto que voy a usar para mandar la data a los servicios , me sirve por que cada uno de estos variables internas las ato a un 
elemento del formulario*/
loginUser = {
  email: 'prueba@prueba.com',
  password: '123456'
};

registerUser: Usuario = {
  email: '',
  password: '123456',
  nombre: 'Test',
  avatar: 'av-1.png',
  direccion: ''
};


constructor(
  private uservice: UsuarioService,
  private navCtrl: NavController,
  private alertas: UiserviceService
) {}

ngOnInit() {
  this.slide.lockSwipes(true);
}

async login(flogin: NgForm) {
  /* en usuario.service el metodo login devuelve una promesa con el resolve que puede venir true o false
   */
  const valido = await this.uservice.login(
    this.loginUser.email,
    this.loginUser.password
  );

  /* si el resolve me dio true navego a las tabs */
  if (valido) {
    this.navCtrl.navigateRoot("/main/tabs/tab1", { animated: true });
  } else {
    this.alertas.mostrarAlerta("Usuario o password invalido!");
  }
}

async registro( fRegistro: NgForm ) {

  if ( fRegistro.invalid ) { return; }

  const valido = await this.uservice.registro( this.registerUser );

  if ( valido ) {
    // navegar al tabs
    this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
  } else {
    // mostrar alerta de usuario y contraseña no correctos
    this.alertas.mostrarAlerta('Ese correo electrónico ya existe.');
  }


}



mostrarLogin() {
  this.slide.lockSwipes(false);
  this.slide.slideTo(0);
  this.slide.lockSwipes(true);
}

mostrarRegistro() {
  this.slide.lockSwipes(false);
  this.slide.slideTo(1);
  this.slide.lockSwipes(true);
}



}
