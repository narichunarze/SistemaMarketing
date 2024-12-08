import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IArchivo } from 'src/app/model/archivo/archivo';
import { SolicitudService } from 'src/app/services/solicitudes/solicitudes.service';
//formGourp variable tipo form, constructor como java, lo que se pcupa dentro del componente, ngoninit son todas las funciones que van a suceder al momento de cargar el componente a nivel web
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  providers: [MessageService],
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  formGroup: FormGroup;
  rangeDates: Date[];
  date: Date[];

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
    this.formGroup = new FormGroup({
      area: new FormControl('admisiones', [Validators.required]),
      tipoPost: new FormControl('vertical', [Validators.required]),
      informacionAdicional: new FormControl('', [Validators.required]),
      fechaEntrega: new FormControl('', [Validators.required]),
      fechasTentativasString: new FormControl('', [Validators.required]),

      base64ImagesList: new FormControl('', [Validators.required]),
      nombreSolicitud: new FormControl('videos', [Validators.required]),
    });
  }
  
  enviarFormulario() {
    let fechasTentativasString = this.formGroup.value.fechasTentativasString.toString();

    let formulario = {...this.formGroup.value, fechasTentativasString};

    this.solicitudService.createBranchOfficeVideo(formulario).subscribe({
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: e.error.data.response });
      },

      complete: () => {
        //cuando complete se va a acrear un artes y cuando vaya a user-index en ngoninit se hace el matcheo con el if de index
        sessionStorage.setItem('evento', 'videos')
        this.router.navigate(['/dashboard/user-index'])
      }

    });
  }

  onFileSelect(event: any): void {
    // Archivos seleccionados
    this.uploadedFiles = event.currentFiles;

      this.filesList = [];

    // Convertir cada archivo a Base64
    this.uploadedFiles.forEach(file => {
      this.convertFileToBase64(file).then(base64 => {

        const withoutQuotes = base64.replace(/"/g, '');

        const base64Data = withoutQuotes.split(',')[1];
        
        this.filesList.push({nombre: file.name, formato: file.type, base64: base64Data, descripcion: 'Solicitud video'});

        
      console.log("Lista cargadaaaaaaa", this.filesList);

      this.formGroup.patchValue({
      base64ImagesList:  this.filesList, 
      });
      }).catch(error => {
        setTimeout(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Falla al cargar el archivo ${file.name}.`
          });
        }, 500);  // 500 milisegundos (0.5 segundos)
      });
    });
  }

  // Función para convertir cualquier archivo a Base64
  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string); // Devuelve Base64
      reader.onerror = error => reject(error); // Manejo de errores
      reader.readAsDataURL(file); // Leer archivo como Base64
    });
  }

}
