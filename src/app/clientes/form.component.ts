import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente: Cliente=new Cliente();
  public titulo: string="Crear Cliente";

  public errores: string[];

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  public cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe(
          (cliente) => this.cliente = cliente
        )
      }
    })
  }

  public create(): void{
    this.clienteService.create(this.cliente).subscribe(
      cliente => { this.router.navigate(['/clientes'])
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `El cliente: ${cliente.nombre} ha sido creado con exito`,
        showConfirmButton: false,
        timer: 2000
      })
    },
    err=> {
      this.errores=err.error.errors as string[];
      console.error('Codigo del error desde el back: '+err.status)
      console.error(err.error.errors);
    }
    );
  }

  public update(): void{
    this.clienteService.updateCliente(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes'])
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${json.mensaje}: ${json.cliente.nombre}`,
          showConfirmButton: false,
          timer: 2000
        })
      },
      err=> {
        this.errores=err.error.errors as string[];
        console.error('Codigo del error desde el back: '+err.status)
        console.error(err.error.errors);
      }
    )
  }


}
