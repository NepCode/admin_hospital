import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

   

    this.contarTres().then(
      //() => console.log('termino'),
      mensaje => console.log('termino', mensaje),
    ).catch(error => console.log('error en la promesa', error));


   }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {

    //let promesa = new Promise( (resolve, reject) => {
    return new Promise( (resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;
        console.log(contador);
        if(contador === 3) {
          //reject('error porovocado atrapado en el catch');
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });

    //return promesa;

  }

}
