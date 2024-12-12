import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { IArchivo } from 'src/app/model/archivo/archivo';
import { SolicitudService } from 'src/app/services/solicitudes/solicitudes.service';
//formGourp variable tipo form, constructor como java, lo que se pcupa dentro del componente, ngoninit son todas las funciones que van a suceder al momento de cargar el componente a nivel web
@Component({
  selector: 'app-videos',
  templateUrl: './videos-info.component.html',
  providers: [MessageService],
  styleUrls: ['./videos-info.component.scss']
})
export class VideosInfoComponent implements OnInit {
  formGroup: FormGroup;
  rangeDates: Date[];
  date: Date[];

  solicitudData: any;

  uploadedFiles: any[] = [];
  base64Files: string[] = [];
  filesList: IArchivo[] = [];


  constructor(private router: Router,
    private solicitudService: SolicitudService,
    private messageService: MessageService,
  ) {
  }
  onDateRangeChange(event: Date[]): void {
    this.rangeDates = event;
    this.formGroup.patchValue({ fechasTentativasString: this.rangeDates });
  }
  onDate(event: Date[]): void {
    this.date = event;
    this.formGroup.patchValue({ fechaEntrega: this.date });

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

    let fechasConvertidas = solicitud.fechaTentativaDate.map(fechaString => new Date(fechaString));
     


    this.formGroup = new FormGroup({
      area: new FormControl({value: solicitud.detalleSolicitud.area, disabled: true}, [Validators.required]),
      tipoPost: new FormControl({value: solicitud.detalleSolicitud.formatoPost, disabled: true}, [Validators.required]),
      informacionAdicional: new FormControl({value: solicitud.detalleSolicitud.informacionAdicional, disabled: true}, [Validators.required]),
      fechaEntrega: new FormControl({value: fechaEntrega, disabled: true}, [Validators.required]),
      fechasTentativasString: new FormControl({value: fechasConvertidas, disabled: true}, [Validators.required]),

    });
  }
  

}
