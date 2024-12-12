import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SolicitudService } from 'src/app/services/solicitudes/solicitudes.service';
import { FileUploadModule } from 'primeng/fileupload';
import { IArchivo } from 'src/app/model/archivo/archivo';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-artes',
  providers: [MessageService],
  templateUrl: './artes-info.component.html',
  styleUrls: ['./artes-info.component.scss']
})
export class ArtesInfoComponent implements OnInit {
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

    let fechasTentativasString = new Date(solicitud.fechaTentativaDate[0]);


    this.formGroup = new FormGroup({
      fechaEntrega: new FormControl({value: fechaEntrega, disabled: true}, [Validators.required]),
      area: new FormControl({value: solicitud.detalleSolicitud.area, disabled: true}, [Validators.required]),
      titulo: new FormControl({value: solicitud.detalleSolicitud.titulo, disabled: true}, [Validators.required]),
      ubicacion: new FormControl({value: solicitud.detalleSolicitud.ubicacion, disabled: true}, [Validators.required]),
      tipoPost: new FormControl({value: solicitud.detalleSolicitud.formatoPost, disabled: true}, [Validators.required]),
      informacionAdicional: new FormControl({value: solicitud.detalleSolicitud.informacionAdicional, disabled: true}, [Validators.required]),
      tipoSolicitud: new FormControl({value: solicitud.detalleSolicitud.tipo, disabled: true}, [Validators.required]),



      fechasTentativasString: new FormControl({value: fechasTentativasString, disabled: true}, [Validators.required]),
      base64ImagesList: new FormControl('', [Validators.required]),
      nombreSolicitud: new FormControl('Artes', [Validators.required]),

    });
  }
}
