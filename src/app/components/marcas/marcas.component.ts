import { Component, OnInit, Input } from '@angular/core';
import { Marca } from '../../interfaces/interfaces';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss'],
})
export class MarcasComponent implements OnInit {


  /* el componente que dibuja el listado de posts recibe como input del padre un vector de masrcas */
  @Input() marcas: Marca[] =[];
  constructor() { }

  ngOnInit() {}

}
