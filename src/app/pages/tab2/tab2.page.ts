import { Component } from '@angular/core';
import { Marca } from 'src/app/interfaces/interfaces';
import { MarcasService } from '../../services/marcas.service';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {



  marcas: Marca[] = [];
  habilitado = false;
  token = '';

  constructor(private servicio: MarcasService, private storage: Storage) {}

  async ngOnInit() {

    console.log('entro al init');
      this.token = await this.storage.get("token");
      console.log('cargue el token', this.token);
    this.siguiente();

    /* me voy a suscribir al emit del postservice ara saber cuando se crea un post nuevo */
    this.servicio.nuevaMarca.subscribe(marca => {
      this.marcas.unshift(marca);
    });

  }

  siguiente(evento?, pull: boolean = false) {
    //si recibi pull true vacio el arreglo de posts
    if (pull) {
      this.marcas = [];
      this.habilitado = false;
    }

    console.log('entro a obtener marcas');

    this.servicio.getPosts(pull, this.token).subscribe(resp => {
      console.log('entre y obtubve', resp);
      this.marcas.push(...resp.marcas);

      if (evento) {
        evento.target.complete();

        /* si n hay ,as posts lo deshabilito */
        if (resp.marcas.length === 0) {
          this.habilitado = true;
        }
      }
    });
  }

  refrescar(evento) {
    this.siguiente(evento, true);
  }

}
