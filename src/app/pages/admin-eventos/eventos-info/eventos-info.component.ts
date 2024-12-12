import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SolicitudService } from 'src/app/services/solicitudes/solicitudes.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos-info.component.html',
  providers: [MessageService],
  styleUrls: ['./eventos-info.component.scss']
})
export class EventosInfoComponent implements OnInit {
  formGroup: FormGroup;

  solicitudData: any;

  constructor(private router: Router,
    private solicitudService: SolicitudService,
    private messageService: MessageService,
  ) {
  }
 
  //formulario con estos campos
  ngOnInit(): void {
   let idSolicitud = sessionStorage.getItem('id');
         
            let solicitudObservable = this.solicitudService.getSolicitudById(idSolicitud);
         
            forkJoin([solicitudObservable]).subscribe({
             next: ([solicitud]) => {
               this.solicitudData = solicitud.data;
               this.createForm(solicitud.data);
             }
            });
  }
  
  private createForm(solicitud: any) {
    let fechaEntrega = new Date(solicitud.fechaEntrega);

    this.formGroup = new FormGroup({
      area: new FormControl({value: solicitud.detalleSolicitud.area, disabled: true}, [Validators.required]),
      informacion: new FormControl({value: solicitud.detalleSolicitud.informacion, disabled: true}, [Validators.required]),
      titulo: new FormControl({value: solicitud.detalleSolicitud.titulo, disabled: true}, [Validators.required]),
      ubicacion: new FormControl({value: solicitud.detalleSolicitud.ubicacion, disabled: true}, [Validators.required]),
      informacionAdicional: new FormControl({value: solicitud.detalleSolicitud.informacionAdicional, disabled: true}, [Validators.required]),
      fechaEntrega: new FormControl({value: fechaEntrega, disabled: true}, [Validators.required]),

    });
  }

}
