import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';



@NgModule({
  declarations: [ImagenPipe, ImageSanitizerPipe, DomSanitizerPipe],
  imports: [
    CommonModule
  ],
  exports: [
    DomSanitizerPipe,
    ImageSanitizerPipe,
    ImagenPipe
  ]
})
export class PipesModule { }
