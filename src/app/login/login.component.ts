import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  recuerdame:boolean =false;

  auth2: any;

  constructor( public router: Router, public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    //load remember me
    this.email = localStorage.getItem('email')  || '';
    if(this.email.length > 1){
      this.recuerdame = true;
    }

  }


  googleInit() {

    /*Initializes Signin v2 and sets up listeners. */
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '539988727082-3kkkap7e4oeitbpp59qot85kvelh78mn.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
    });

    this.attachSignin( document.getElementById('btnGoogle'));

    });
  }


  attachSignin( element ) {

    this.auth2.attachClickHandler(element, {}, (googleUser) => {
     /*  let profile = googleUser.getBasicProfile();
      console.log(profile);
      console.log('ID: ' + profile.getId()); 
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); */

      let token = googleUser.getAuthResponse().id_token;
      //console.log(token);

      this._usuarioService.loginGoogle( token )
          //.subscribe( resp => { console.log(resp);  });
          .subscribe( () => window.location.href = '#/dashboard' );
     

    });

  }



  ingresar( forma: NgForm) {



    let usuario = new Usuario(null,forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
    .subscribe( correcto => this.router.navigate(['/dashboard']));

   /*  this._usuarioService.login(usuario, forma.value.recuerdame)
    .subscribe( correcto => {

      console.log(correcto);

    }); */

   /*  console.log(forma.valid);
    console.log(forma.value); */

    //this.router.navigate([ '/dashboard' ]);

  }

}
