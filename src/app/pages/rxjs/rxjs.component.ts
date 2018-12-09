import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry,map,filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription : Subscription;


  constructor() { 

   

   /*  obs.subscribe( numero => {
      console.log('sub', numero);
    }); */

    this.subscription = this.regresaObervable()/* .pipe(
      retry(2)
    ) */
    .subscribe( 
      numero => console.log('sub', numero),
      error => console.log('error en obs', error),
      () => console.log('oservador termino')

    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('la pagina se va a cerrar');
    this.subscription.unsubscribe();
  }


  regresaObervable(): Observable<any> {
    return new Observable(( observer: Subscriber<any> )=>  {

      let contador = 0;
      
      const intervalo = setInterval( () => {
        contador +=1;

        //observer.next(contador);

        const salida = {
          valor:contador
        }

        observer.next(salida);

       /*  if(contador === 3){
          clearInterval(intervalo);
          observer.complete();
        } */


       /*  if(contador === 2) {
          clearInterval(intervalo);
          observer.error('Auxilio');
        } */
      }, 1000);

    }).pipe(

   /*    map( resp => {
        return resp.valor;
      }) */

      map( resp =>  resp.valor),
      filter ( (valor, index) => {

        //console.log('filter',valor, index);

        if( (valor % 2) === 1) {
          //impar 
          return true;
        }else {
          //par 
          return false;
        }
      })

    );

    

  }



}
