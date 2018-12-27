import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { retry,map,filter } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  totalHospitales: number = 0; //variable for total registers
  token: string;


  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }



/*   cargarHospitales(desde: number = 0) {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url)
    .pipe(map((resp: any) =>  {
      this.totalHospitales = resp.total;
      //console.log(resp.hospitales);
      return resp.hospitales;
    } )); 
  } */

  cargarHospitales(desde: number = 0) {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url);
  }

  cargarHospitalesMedico() {
    let url = URL_SERVICIOS + '/hospital';
    //return this.http.get(url);
    return this.http.get(url)
    .pipe(map((resp: any) =>{
                this.totalHospitales = resp.total;
                return resp.hospitales;
              }));

  }


  
  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
    .pipe(map((resp: any) => resp.hospital )); 
  }

  
  borrarHospital(id: string) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    //return this.http.delete(url);

    return this.http.delete(url)
    .pipe(map((resp) => {
       swal('Hospital deleted','this Hospital has already deleted','success');
       //return true;

       })); 
  }


  crearHospital(nombre:string) {

    let url =URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

   /*  return this.http.post( url , usuario)
                .map(  (resp: any) => {
                  return resp.usuario;
                }); */

       return this.http.post(url, {nombre:nombre} )
          .pipe(map((resp: any) =>  resp.hospital ));
              //swal('Usuario Creado', usuario.email, 'success');
            

   }


   
   buscarHospital(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    //return this.http.get(url);
    return this.http.get(url)
         .pipe(map((resp: any) =>  resp.hospitales )); 
  }


  actualizarHospital(hospital:Hospital) {

    let url =URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    //console.log(url);


    return this.http.put(url, hospital)
    .pipe(map((resp: any) => {
    swal('Hospital updated',hospital.nombre,'success');
    return resp.hospital 
    
    })); 


 

   }






}
