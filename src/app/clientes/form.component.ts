import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
  }

  public create(): void{
    this.clienteService.create(this.cliente).subscribe(
      cliente => { this.router.navigate(['/clientes'])
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Cliente ${cliente.nombre} creado con exito`,
        showConfirmButton: false,
        timer: 1500
      })
    }
    );
  }

}
