import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SolicitudService } from 'src/app/services/solicitudes/solicitudes.service';

@Component({
  selector: 'app-artes',
  providers: [MessageService],
  templateUrl: './artes.component.html',
  styleUrls: ['./artes.component.scss']
})
export class ArtesComponent implements OnInit {
  formGroup: FormGroup;
  date: Date[];

  constructor(private router: Router,
    private solicitudService: SolicitudService,
    private messageService: MessageService,
  ) {
  }
  //formulario con estos campos
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      fechaEntrega: new FormControl('', [Validators.required]),
      area: new FormControl('Admisiones', [Validators.required]),
      titulo: new FormControl('', [Validators.required]),
      ubicacion: new FormControl('', [Validators.required]),
      tipoPost: new FormControl('Historia', [Validators.required]),
      informacionAdicional: new FormControl('ComentarioAdicionalVacio', [Validators.required]),
      tipoSolicitud: new FormControl('Interno', [Validators.required]),



      fechasTentativasString: new FormControl('', [Validators.required]),
      nombreSolicitud: new FormControl('Artes', [Validators.required]),

    });
  }

  enviarFormulario() {
    this.solicitudService.createBranchOfficeArt(this.formGroup.value).subscribe({
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error.data.response });
      },

      complete: () => {
        //cuando complete se va a acrear un artes y cuando vaya a user-index en ngoninit se hace el matcheo con el if de index
        sessionStorage.setItem('evento', 'artes')
        this.router.navigate(['/dashboard/user-index'])


      }

    });
  }
}
