import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { retry,map,filter } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  //medico: Hospital;
  totalMedicos: number = 0; //variable for total registers
  token: string;


  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }





/*   cargarHospitales(desde: number = 0) {
    let url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(url);
  }
 */
  cargarMedicos2(desde: number = 0) {
    let url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(url)
    .pipe(map((resp: any) =>  {
      this.totalMedicos = resp.total;
      //console.log(resp.hospitales);
      return resp.medicos;
    } )); 
  }

  
  cargarMedicos(desde: number = 0) {
    let url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(url);
  }

  cargarMedico( id: string ) {

    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url )
              .pipe(map((resp: any) =>  resp.medico )); 
  }

  buscarMedicos(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    //return this.http.get(url);
    return this.http.get(url)
         .pipe(map((resp: any) =>  resp.medicos )); 
  }

  borrarMedico(id: string) {

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    //return this.http.delete(url);

    return this.http.delete(url)
    .pipe(map((resp) => {
       swal('medico deleted','this medico has already deleted','success');
       return resp;
       })); 
  }

  guardarMedico( medico: Medico ) {

    let url = URL_SERVICIOS + '/medico';

     if ( medico._id ) {
      // updating
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, medico )
                .pipe(map( (resp: any) => {
                  swal('Médico Actualizado', medico.nombre, 'success');
                  return resp.medico;
                }));

    } else { 

      // creating
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, medico )
              .pipe(map( (resp: any) => {
                swal('Médico Creado', medico.nombre, 'success');
                return resp.medico;
              }));
    }
  }


  








}
