import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SolicitudService } from 'src/app/services/solicitudes/solicitudes.service';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  providers: [MessageService],
  styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent  implements OnInit {
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
      fechaEntrega: new FormControl('admisiones', [Validators.required]),
      informacion: new FormControl('', [Validators.required]),
      informacionAdicional: new FormControl('', [Validators.required]),

      nombreSolicitud: new FormControl('podcast', [Validators.required]),
    });
  }
  
  enviarFormulario() {

    this.solicitudService.createBranchOfficePodcast(this.formGroup.value).subscribe({
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error.data.response });
      },

      complete: () => {
        //cuando complete se va a acrear un artes y cuando vaya a user-index en ngoninit se hace el matcheo con el if de index
        sessionStorage.setItem('evento', 'podcast')
        this.router.navigate(['/dashboard/user-index'])
      }

    });
  }

}
