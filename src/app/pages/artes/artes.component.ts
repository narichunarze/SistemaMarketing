import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SolicitudService } from 'src/app/services/solicitudes/solicitudes.service';
import { FileUploadModule } from 'primeng/fileupload';
import { IArchivo } from 'src/app/model/archivo/archivo';


@Component({
  selector: 'app-artes',
  providers: [MessageService],
  templateUrl: './artes.component.html',
  styleUrls: ['./artes.component.scss']
})
export class ArtesComponent implements OnInit {
  formGroup: FormGroup;
  date: Date[];

  uploadedFiles: any[] = [];
  base64Files: string[] = [];
  filesList: IArchivo[] = [];

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
      base64ImagesList: new FormControl('', [Validators.required]),
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
        event

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
