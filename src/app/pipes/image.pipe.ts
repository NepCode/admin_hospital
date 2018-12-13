import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  /* transform(value: any, args?: any): any {
    return 'funciona';
  } */

  transform(img: any, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if( !img ) {
      return url + '/usuarios/xxx';
    }

    //google url image
    if( img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
     
      case 'usuario':
          url += '/usuarios/' + img;
        break;

      case 'medico':
          url += '/medicos/' + img;
        break;

      case 'hospital':
          url += '/hospital/' + img;
        break;
    
      default:
        console.log('this image does not exist, usuario, medico , hospital');
        url += '/usuarios/xxx';
        break;

    }

    return url;
  }

}
