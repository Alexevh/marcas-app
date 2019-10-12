import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiserviceService {

 
  constructor(public alertController: AlertController) { }



  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Mensaje del sistema',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
