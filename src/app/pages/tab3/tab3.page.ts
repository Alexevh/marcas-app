import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiserviceService } from 'src/app/services/uiservice.service';
import { MarcasService } from '../../services/marcas.service';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private servicioUsuario: UsuarioService, private uiservice: UiserviceService, private marcaservice: MarcasService ) {}

  usuario: Usuario ={}

  logout(){
    this.marcaservice.paginaMarcas =0;
    this.servicioUsuario.logout();
  }


  ngOnInit(): void {
    this.usuario = this.servicioUsuario.getUsuario();
    console.log('me llega el usuario', this.usuario);
  }

  async actualizar(FActualizar: NgForm){

    if (FActualizar.invalid) {return;};

    const actualizado = await this.servicioUsuario.actualizarUsuario(this.usuario);
    console.log('la actualizacion dio ', actualizado);

    if (actualizado){
      this.uiservice.mostrarAlerta('Usuario actualizo con exito');
    } else {
      this.uiservice.mostrarAlerta('Error en la actualizacion');
    }
  }

}
