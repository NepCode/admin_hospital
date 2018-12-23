import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imgTemp: string;

  searchValue:string = '';



  constructor(
    public _cargaArchivoService: UploadFileService,
    public _modalUploadService: ModalUploadService
  ) {

   
   }

  ngOnInit() {
  }

 
  cerrarModal() {
    this.imgTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
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

  subirImagen() {

    this._cargaArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
    .then( resp => {

      //console.log(resp);
      this._modalUploadService.notificacion.emit( resp );
      this.searchValue = null;
      this.cerrarModal();

    })
    .catch( err => {
      console.log( 'Error en la carga... ');
    });
  
  }

}
