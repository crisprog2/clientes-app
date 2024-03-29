import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import Swal from "sweetalert2";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(e=>{
        if (e.status==401) {
          if (this.authService.isAuthenticated()) {
            this.authService.logout();
          }
          this.router.navigate(['/login']);
        }
        if (e.status==403) {
          Swal.fire('Accesso denegado', `Hola ${this.authService.usuario.username} no tienes accesso a este recurso!`, 'warning');
          this.router.navigate(['/clientes']);
        }
        return throwError(()=>e);
      })
    );
  }
}
