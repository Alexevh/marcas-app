import { Component, OnInit, Input } from '@angular/core';
import { Marca } from '../../interfaces/interfaces';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss'],
})
export class MarcaComponent implements OnInit {

  @Input() marca: Marca ={};
  constructor() { }

  ngOnInit() {}

}
