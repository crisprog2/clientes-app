import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string='Por favor Ingrese al Sistema!';
  usuario:Usuario;

  constructor() { }

  ngOnInit(): void {
    this.usuario=new Usuario();
  }

  login(): void{
    console.log(this.usuario);
    if (this.usuario.username==null || this.usuario.password==null || this.usuario.username=="" || this.usuario.password=="") {
      Swal.fire({
        icon: 'error',
        title: 'Error Login',
        text: 'Usuario o contraseña vacias'
      });
      return;
    }
  }

}
