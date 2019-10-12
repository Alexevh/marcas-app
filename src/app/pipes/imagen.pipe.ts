import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {


  transform(imagen: string, userId: string): string {
    return `${URL}/marca/imagen/${userId}/${imagen}`;
  }
}
