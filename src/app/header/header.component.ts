import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string="App Angular Spring"

  constructor(public authService: AuthService, private router: Router) { }

  logout():void{
    Swal.fire(
      'Logout',
      `Hola ${this.authService.usuario.username}, has cerrado sesión con éxito!`,
      'success'
    );
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}
