import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string='Por favor Ingrese al Sistema!';
  usuario:Usuario;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuario=new Usuario();
  }

  login(): void{
    if (this.usuario.username==null || this.usuario.password==null || this.usuario.username=="" || this.usuario.password=="") {
      Swal.fire({
        icon: 'error',
        title: 'Error Login',
        text: 'Usuario o contraseña vacias'
      });
      return;
    }
    this.authService.login(this.usuario).subscribe(
      response => {
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        let usuario=this.authService.usuario;
        this.router.navigate(['/clientes']);
        Swal.fire(
          'Login',
          `Hola ${usuario.username}, has iniciado sesión con éxito!`,
          'success'
        );
      }, err=>{
        if (err.status==400) {
          Swal.fire({
            icon: 'error',
            title: 'Error Login',
            text: 'Usuario o contraseña incorrectas'
          });
        }
      }
      );
  }

}
