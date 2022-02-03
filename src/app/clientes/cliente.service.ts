
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cliente } from "./cliente";
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint: string= 'http://localhost:8080/api/clientes';
  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    return this.http.get(this.urlEndpoint).pipe(
      map( (response) => response as Cliente[])
    );
  }

  create(cliente: Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndpoint, cliente, {headers: this.httpHeaders})
  }

  getCliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`)
  }

  updateCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers:this.httpHeaders})
  }

  deleteCliente(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders})
  }

}
