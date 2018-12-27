import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = []; //array ;
  desde: number = 0; //variable for pagination
  totalRegistros: number = 0; //variable for total registers
  cargando: boolean = true; //to trigger animation loader spin

  constructor(
    public _medicoService: MedicoService,
  ) { }

  ngOnInit() {
    this.cargarMedicos();

  }



  cargarMedicos(desde: number = 0) {

    this.cargando = true;

    //fernando
   /*    this._medicoService.cargarMedicos(this.desde)
        .subscribe( medicos =>  this.medicos = medicos  );
        this.cargando = false;   */


      this._medicoService.cargarMedicos(this.desde)
    .subscribe( (resp:any) => {
      //console.log(resp);
      //console.table(resp.medicos);
    
      this.totalRegistros  = resp.total;
      this.medicos = resp.medicos;
      this.cargando = false;
    });  

  }


  buscarMedicos(termino: string) {

    if(termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this._medicoService.buscarMedicos(termino)
    .subscribe( (medicos) =>  this.medicos = medicos  );
  }


  
  borrarMedico(medico: Medico) {


    this._medicoService.borrarMedico(medico._id)
    .subscribe ( () => this.cargarMedicos()  );
    this.getMedicos(5);
  
}

//calculate pagination
getMedicos(amount?:number){
  if (amount == 5 && this.totalRegistros - this.desde == 1) 
      this.desde = (this.totalRegistros - 1 ) - amount;
      this._medicoService.cargarMedicos(this.desde)
      .subscribe((res:any) => {
        console.log(res);
      this.medicos = res.users;
      this.totalRegistros = res.userCount;
  });
}


  //pagination next prev
  cambiarDesde( valor: number) {
    let desde = this.desde + valor;
    console.log(desde);

    if(desde >= this.totalRegistros) {
      return;
    }

    if(desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();
  }


}
