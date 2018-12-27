import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  usuarios: Usuario[] = []; //array for users
  desde: number = 0; //variable for pagination
  totalRegistros: number = 0; //variable for total registers
  cargando: boolean = true; //to trigger animation loader spin


  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
    
    ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
        .subscribe(resp => this.cargarUsuarios() );
  }

  mostrarModal(id: string) {

    this._modalUploadService.mostrarModal('usuarios',id);

  }

  //loading users
  cargarUsuarios(){

    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
        .subscribe( (resp:any) => {
          //console.log(resp);
          this.totalRegistros  = resp.total;
          this.usuarios = resp.usuarios;
          this.cargando = false;
        });

  }

  getUsers(amount?:number){
    if (amount == 5 && this.totalRegistros - this.desde == 1) 
        this.desde = (this.totalRegistros - 1 ) - amount;
        this._usuarioService.cargarUsuarios(this.desde)
        .subscribe((res:any) => {
        this.usuarios = res.users;
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
    this.cargarUsuarios();
  }


  //find user
  buscarUsuario(termino: string) {
    //console.log(termino);

    if(termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios(termino)
    .subscribe( (usuarios:  Usuario[]) => {
      //console.log(usuarios);
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }


  //delete user
  borrarUsuario(usuario: Usuario) {
    //console.log(usuario);
    if( usuario._id === this._usuarioService.usuario._id) {
      swal('You can not do this action', this._usuarioService.usuario.nombre, 'error');
      return;
    }

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this user?" + usuario.nombre,
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {

      if (willDelete) {
        this._usuarioService.borrarUsuario(usuario._id)
        .subscribe ( resp => { // return user deleted 
          console.log(resp);
          this.cargarUsuarios();
        })
        swal("Deleted!", "User has been deleted!", "success");
        this.getUsers(5);
      }

    });

  }


   //update role  user
   guardarUsuario(usuario: Usuario) {
   

  
        this._usuarioService.actualizarUsuario(usuario)
        .subscribe ( resp => { // return user deleted 
          console.log(resp);
          //this.cargarUsuarios();
        })
        //swal("Updated!", "User has been updated!", "success");
       
      



  }








}
