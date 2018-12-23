import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imgTemp: string;

  searchValue:string = '';

  constructor( public _usuarioService: UsuarioService) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario){
    //console.log(usuario);
    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }


   /*  this._usuarioService.actualizarUsuario(this.usuario)
                .subscribe( resp => {
                  console.log ( resp );
                }); */
        this._usuarioService.actualizarUsuario(this.usuario)
        .subscribe();

  }

  seleccionImagen(archivo: File){

    if(!archivo) {
      this.imagenSubir = null;
      return;
    }

    //checkinf what type of file
    console.log(archivo);
    if( archivo.type.indexOf('image')<0){
      swal('only image file', 'selected file it not a image', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    //console.log(event);

    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL(archivo);
    
    /* reader.onloadend = function () {
      console.log(reader.result);
    } */

    reader.onloadend =  () => this.imgTemp = reader.result.toString();
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
    this.searchValue = null;
  }

}
