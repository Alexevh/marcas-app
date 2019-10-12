import { Injectable, EventEmitter } from '@angular/core';
import { OSNotificationPayload, OSNotification } from '@ionic-native/onesignal/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal, private storage: Storage) {
    this.cargarMensajes();
  }

  mensajes: any[] = [];

  /* voy a identificar al usuario para mandar notificaciones personalizadas */
  userID: string;

  pushListener = new EventEmitter<OSNotificationPayload>();

  configuracionInicial() {
    /* el primer paramtero es el key de onseignal de la app (no es el apikey es el proyect key)
    el segundo argumento es el id del royecto en firebase */
    this.oneSignal.startInit(
      "3e4701e1-60f8-438a-9b8a-30f1670987ca",
      "623247996807"
    );

    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.Notification
    );

    this.oneSignal.handleNotificationReceived().subscribe(noti => {
      // do something when notification is received
      this.notificacionRecibida(noti);
    });

    this.oneSignal.handleNotificationOpened().subscribe(async noti => {
      // do something when a notification is opened
      await this.notificacionRecibida(noti.notification);
    });

    /** obtengo el id del usuario*/
    this.oneSignal.getIds().then( info => {
      this.userID = info.userId;
    });

    this.oneSignal.endInit();
  }

  async notificacionRecibida(noti: OSNotification) {
    await this.cargarMensajes();

    const payload = noti.payload;

    /* me voy a fijar si ya existe la notificacion  esto me da un boolean*/
    const existePush = this.mensajes.find(
      mensaje => mensaje.notificationId === payload.notificationID
    );

    if (existePush) {
      return;
    }

    this.mensajes.unshift(payload);

    /* cada vez que recibo una notificacion, este observable llamado pushlistener va a emitir una notificacion con
    el payload */
    this.pushListener.emit(payload);

    await this.storage.set("mensajes", this.mensajes);
  }

  guardarMensajes() {
    this.storage.set("mensajes", this.mensajes);
  }

  async cargarMensajes() {
    this.mensajes = (await this.storage.get("mensajes")) || [];
    return this.mensajes;
  }

  async getMensajes() {
    await this.cargarMensajes();
    return [...this.mensajes];
  }
}
