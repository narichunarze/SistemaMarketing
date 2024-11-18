import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SolicitudService } from 'src/app/services/solicitudes/solicitudes.service';
//formGourp variable tipo form, constructor como java, lo que se pcupa dentro del componente, ngoninit son todas las funciones que van a suceder al momento de cargar el componente a nivel web
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
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
      area: new FormControl('', [Validators.required]),
      tipoPost: new FormControl('', [Validators.required]),
      informacionAdicional: new FormControl('', [Validators.required]),
      fechaEntrega: new FormControl('', [Validators.required]),
      fechasTentativasString: new FormControl('', [Validators.required]),
      nombreSolicitud: new FormControl('', [Validators.required]),

    });
  }
  

}
