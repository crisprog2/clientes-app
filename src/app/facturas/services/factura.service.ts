import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndpoint: string = 'http://localhost:8080/api/facturas';

  constructor(private http: HttpClient) { }

getFactura(id:number): Observable<Factura>{
  return this.http.get<Factura>(this.urlEndpoint+'/'+id);
}

delete(id: number): Observable<void>{
  return this.http.delete<void>(this.urlEndpoint+'/'+id);
}

}
