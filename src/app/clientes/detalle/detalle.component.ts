import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Factura } from 'src/app/facturas/models/factura';
import { FacturaService } from 'src/app/facturas/services/factura.service';
import { AuthService } from 'src/app/usuarios/auth.service';
import Swal from 'sweetalert2';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;
  titulo: string="Detalle del Cliente";
  public fotoSeleccionada: File;
  public progreso: number=0;

  constructor(private clienteService: ClienteService, public modalService: ModalService, public authService: AuthService, private facturaService: FacturaService) { }

  ngOnInit(): void {

  }

  seleccionarFoto(event){
    this.fotoSeleccionada=event.target.files[0];
    this.progreso=0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image')<0) {
      Swal.fire(
        'Error: seleccionar imagen: ',
        'El archivo debe ser del tipo imagen!',
        'error'
      );
      this.fotoSeleccionada=null;
    }
  }

  subirFoto(){

    if (!this.fotoSeleccionada) {
      Swal.fire(
        'Error: Upload: ',
        'Debe seleccionar una foto!',
        'error'
      );
    }else{
      this.clienteService.subirFoto(this.fotoSeleccionada,this.cliente.id)
      .subscribe(event=>{
        if(event.type === HttpEventType.UploadProgress){
          this.progreso=Math.round((event.loaded/event.total)*100);
        }else if (event.type===HttpEventType.Response) {
          let response:any=event.body;
          this.cliente=response.cliente as Cliente;
          this.modalService.notificarUpload.emit(this.cliente);
          Swal.fire(
            'La foto se ha subido completamente!',
            response.mensaje,
            'success'
          );
        }
      });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada=null;
    this.progreso=0;
  }

  delete(factura: Factura): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta Seguro?',
      text: "No podrá revertir este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.facturaService.delete(factura.id).subscribe(
          response => {
            this.cliente.facturas = this.cliente.facturas?.filter(f => f !== factura)
            swalWithBootstrapButtons.fire(
              'Factura Eliminada!',
              `Factura ${factura.descripcion} eliminada con Exito`,
              'success'
            )
          }
        )

      }
    })
  }



}
