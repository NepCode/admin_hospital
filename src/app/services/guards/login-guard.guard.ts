import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable(/* {
  providedIn: 'root'
} */)
export class LoginGuardGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService, public router: Router ) {}

  canActivate() {

    //console.log('pasa por login guard');

    if(this._usuarioService.estalogueado()){
      console.log('pasa el guard');
      return true;
    } else {
      console.log('bloqueado por el guard');
      this.router.navigate(['/login']);
      return false;
    }

    //return true;
  }
}
