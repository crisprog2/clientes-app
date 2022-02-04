
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Cliente } from "./cliente";
import { map, catchError } from 'rxjs';
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint: string= 'http://localhost:8080/api/clientes';
  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]>{
    return this.http.get(this.urlEndpoint).pipe(
      map( (response) => response as Cliente[])
    );
  }

  create(cliente: Cliente):Observable<Cliente>{
    return this.http.post(this.urlEndpoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire('Error al crear el cliente', e.error.mensaje, 'error');
        return throwError(()=>e);
      })
    );
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e=>{
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al consultar', e.error.mensaje, 'error');
        return throwError(()=>e);
      })
    );
  }

  updateCliente(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers:this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire('Error al actualizar el cliente', e.error.mensaje, 'error');
        return throwError(()=>e);
      })
    );
  }

  deleteCliente(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire('Error al eliminar el cliente', e.error.mensaje, 'error');
        return throwError(()=>e);
      })
    );
  }

}
