import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SolicitudService } from 'src/app/services/solicitudes/solicitudes.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  providers: [MessageService],
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  formGroup: FormGroup;
  rangeDates: Date[];
  date: Date[];

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
    this.formGroup = new FormGroup({
      area: new FormControl('admisiones', [Validators.required]),
      informacion: new FormControl('', [Validators.required]),
      titulo: new FormControl('', [Validators.required]),
      ubicacion: new FormControl('', [Validators.required]),
      informacionAdicional: new FormControl('', [Validators.required]),
      fechaEntrega: new FormControl('', [Validators.required]),

      nombreSolicitud: new FormControl('eventos', [Validators.required]),
    });
  }
  
  enviarFormulario() {

    this.solicitudService.createBranchOfficeEvent(this.formGroup.value).subscribe({
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error.data.response });
      },

      complete: () => {
        //cuando complete se va a acrear un artes y cuando vaya a user-index en ngoninit se hace el matcheo con el if de index
        sessionStorage.setItem('evento', 'eventos')
        this.router.navigate(['/dashboard/user-index'])
      }

    });
  }

}
