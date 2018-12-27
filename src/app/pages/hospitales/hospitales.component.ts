import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import swal from 'sweetalert';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = []; //array for hospitales
  desde: number = 0; //variable for pagination
  totalRegistros: number = 0; //variable for total registers
  cargando: boolean = true; //to trigger animation loader spin

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { 
   
  }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
    .subscribe(resp => this.cargarHospitales() );

  }


  buscarHospital(termino: string) {
    //console.log(termino);

    if(termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    //this.cargando = true;

   /*  this._hospitalService.buscarHospital(termino)
    .subscribe( (hospitales:  Hospital[]) => {
      this.hospitales = hospitales;
      //this.cargando = false;
    }); */

    this._hospitalService.buscarHospital(termino)
    .subscribe( (hospitales) =>  this.hospitales = hospitales  );
  }

  cargarHospitales(){

    this.cargando = true;

 /*    this._hospitalService.cargarHospitales(this.desde)
        .subscribe( hospitales =>  this.hospitales = hospitales  ); */


    this._hospitalService.cargarHospitales(this.desde)
    .subscribe( (resp:any) => {
      console.log(resp);
      this.totalRegistros  = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });

  }


  getHospitales(amount?:number){
    if (amount == 5 && this.totalRegistros - this.desde == 1) 
        this.desde = (this.totalRegistros - 1 ) - amount;
        this._hospitalService.cargarHospitales(this.desde)
        .subscribe((res:any) => {
        this.hospitales = res.users;
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
    this.cargarHospitales();
  }

  guardarHospital( hospital: Hospital) {

    this._hospitalService.actualizarHospital(hospital)
    .subscribe(); //1
    /* .subscribe ( resp => { // return hospital deleted 
      console.log(resp);
    }); */
  }

  borrarHospitalTONY(hospital: Hospital) {

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this user?" + hospital.nombre,
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {

      if (willDelete) {
        this._hospitalService.borrarHospital(this._hospitalService.hospital._id)
        .subscribe ( resp => { // return hospital deleted 
          console.log(resp);
          this.cargarHospitales();
        })
        swal("Deleted!", "Hospital has been deleted!", "success");
        //this.getUsers(5);
      }

    });
  }

  borrarHospital(hospital: Hospital) {


        this._hospitalService.borrarHospital(hospital._id)
        .subscribe ( () => this.cargarHospitales()  );
        this.getHospitales(5);
      
  }


  crearHospital(hospital: Hospital){

    swal({

      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: {
        element: 'input',
        attributes: {
          placeholder: '',
          type: 'text',
        },
      },

      icon: 'info',
      buttons: ['Cancelar', 'Guardar'],
      dangerMode: true
    }).then( (valor:string) => {

      if(!valor || valor.length === 0) {
        return;
      }

      this._hospitalService.crearHospital(valor)
      .subscribe ( resp => { // return hospital  
        console.log(resp);
        this.cargarHospitales();
      })
      swal("Hospital created!", valor, "success");
      //this.getUsers(5);
      

    });




  }


  actualizarImagen(hospital: Hospital){

    this._modalUploadService.mostrarModal('hospitales',hospital._id);

  }




  

}
