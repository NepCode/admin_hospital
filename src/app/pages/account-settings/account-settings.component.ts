import { Component, OnInit, Inject, Renderer2,ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

 

  //inject dont use anymore
  constructor( @Inject(DOCUMENT) private _document, private renderer: Renderer2, private el: ElementRef, public _ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  changeTheme( theme : string, link: any) {

    console.log(theme, link);

    this.aplicarCheck(link);

    /* let url = `assets/css/colors/${theme}.css`;
    //this._document.getElementById('theme_conf').setAttribute('href', theme + '.css');
    //this._document.getElementById('theme_conf').setAttribute('href',url); //fernando
    this.renderer.setAttribute(document.getElementById('theme_conf'),'href',url);

    this._ajustes.ajustes.tema  = theme;
    this._ajustes.ajustes.temaUrl  = url;

    this._ajustes.guardarAjustes(); */

    this._ajustes.aplicarTema(theme);


  }

  aplicarCheck(link: any) {

    let selectores: any = document.getElementsByClassName('selector');

    for( let ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');

  }

  colocarCheck() {

    /* let selectores: any = document.getElementsByClassName('selector');

    let tema = this._ajustes.ajustes.tema;

    for( let ref of selectores) {

      if(  ref.getAttribute('data-theme') === tema) {

        ref.classList.add('working');
        break;

      }

    } */

    document.getElementsByClassName(`${this._ajustes.ajustes.tema}-theme`)
    .item(0)
    .classList.add('working');

    //console.log(this._ajustes.ajustes.tema);

  }



}
