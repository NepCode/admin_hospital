import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//import * as swal from 'sweetalert';
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router //to navigate links
    ) { }

  sonIguales(campo1: string,campo2: string) {

    return ( group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if(pass1 === pass2) {
        return null;
      } /* else {
        return {
          sonIguales: false
        };
      } */

      return {
        sonIguales: true
      };

    };
  }

  ngOnInit() {
    init_plugins();


    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, {validators: this.sonIguales('password','password2') } );

    this.forma.setValue({
      nombre: 'Test',
      correo: 'Test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });

  }


  
  registrarUsuario(){

    if(this.forma.invalid /* || !this.forma */) {
      return;
    }

    if(!this.forma.value.condiciones){
      //console.log('accept terms and conditions');
      swal('Important!', 'You must accept terms and conditions', 'warning');
      return;
    }

   /*  console.log('forma valida?',this.forma.valid);
    console.log(this.forma.value); */


    let usuario = new Usuario (
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario)
              /* .subscribe(resp => {
                console.log(resp);
                this.router.navigate(['/login']);
              }); */
              .subscribe(resp =>   this.router.navigate(['/login'])  );

  }


}
