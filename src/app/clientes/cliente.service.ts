
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Cliente } from "./cliente";
import { map, catchError } from 'rxjs';
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { Region } from "./region";


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint: string= 'http://localhost:8080/api/clientes';
  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  private isNoAutorizado(e): boolean{
    if (e.status==401 || e.status==403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndpoint+'/regiones').pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(()=>e);
      })
    );
  }

  getClientes(page: number): Observable<any>{
    return this.http.get(this.urlEndpoint+'/page/'+page).pipe(
      map( (response:any) => {
        (response.content as Cliente[]);
        return response;
      })
    );
  }

  create(cliente: Cliente):Observable<Cliente>{
    return this.http.post(this.urlEndpoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e=>{

        if (this.isNoAutorizado(e)) {
          return throwError(()=>e);
        }

        if (e.status==400) {
          return throwError(()=>e);
        }

        console.error(e.error.mensaje);
        Swal.fire('Error al crear el cliente', e.error.mensaje, 'error');
        return throwError(()=>e);
      })
    );
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e=>{

        if (this.isNoAutorizado(e)) {
          return throwError(()=>e);
        }

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

        if (this.isNoAutorizado(e)) {
          return throwError(()=>e);
        }

        if (e.status==400) {
          return throwError(()=>e);
        }

        console.error(e.error.mensaje);
        Swal.fire('Error al actualizar el cliente', e.error.mensaje, 'error');
        return throwError(()=>e);
      })
    );
  }

  deleteCliente(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e=>{

        if (this.isNoAutorizado(e)) {
          return throwError(()=>e);
        }

        console.error(e.error.mensaje);
        Swal.fire('Error al eliminar el cliente', e.error.mensaje, 'error');
        return throwError(()=>e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData= new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    const req = new HttpRequest('POST', `${this.urlEndpoint}/upload`, formData, {
      reportProgress: true
    });
    return this.http.request(req).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(()=>e);
      })
    );
  }

}
