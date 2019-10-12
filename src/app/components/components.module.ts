import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcasComponent } from './marcas/marcas.component';
import { MarcaComponent } from './marca/marca.component';
import { IonicModule } from '@ionic/angular';
import { MapaComponent } from './mapa/mapa.component';



@NgModule({
  declarations: [
    MarcasComponent,
    MarcaComponent,
    MapaComponent
  ],
  exports: [
    MarcasComponent,
    MarcaComponent,
    MapaComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class ComponentsModule { }
