import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {

  constructor(private uservice: UsuarioService){}

  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    return this.uservice.validaToken();
    //return true;
  }
}
