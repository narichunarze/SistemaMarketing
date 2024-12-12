import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { ColumnStructure, FormConfig } from 'src/app/demo/domain/columnDataStructure';
import { PermissionService } from 'src/app/services/permission/permission.service';
import { SolicitudService } from 'src/app/services/solicitudes/solicitudes.service';

@Component({
  selector: 'app-video-admin',
  templateUrl: './video-admin.component.html',
  providers: [MessageService],  
  styleUrls: ['./video-admin.component.scss']
})
export class VideoAdminComponent implements OnInit, OnDestroy {

  pageableData: any;
  tableStructure: ColumnStructure[];
  gobalFilters;

  createFormStructure: FormConfig;
  isVisibleCreate: boolean = null;
  actions: any = [];
  submittedData: any;
  formData;


  filesData = [];

  constructor(private solicitudService: SolicitudService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute,
    private permissionService: PermissionService,
    private messageService: MessageService,
  ) {

  }

  ngOnInit(): void {
    this.getEnterprisePermissions();

    this.buildPageStructure();

  }

  ngOnDestroy(): void {
  }

  private getEnterprisesPageableData(params: any = { page: 0, size: 5, tipoSolicitud: 'video' }) {
    let solicitudObservable = this.solicitudService.getSolicitudesPageable(params);

    forkJoin([solicitudObservable]).subscribe(
        ([solicitudes]) => {
            this.pageableData = solicitudes.data;
        }
    );
  }

  handleActionTriggered(event: { action: string, data: any }) {
    switch(event.action) {
      case 'view':
        sessionStorage.setItem('id', event.data.id);
        this.router.navigate(['dashboard/admin-videos-info']);
        break;

      case 'download':
        this.downloadFiles(event.data.id);
        break;

      }
  }

  downloadFiles(id: string) {
    let filesList = this.solicitudService.getFilesByIdSolicitud(id);

    forkJoin([filesList]).subscribe({
      next: ([solicitudes]) => {
        this.filesData = solicitudes.data ?? [];
       },
       complete: () => {
        if(!!this.filesData) {
          this.filesData.forEach(element => {
            var blob = this.b64toBlob(element.base64Data, element.formato);
            let a = document.createElement("a");
            document.body.appendChild(a);
            var url = window.URL.createObjectURL(blob);
            a.href = url;
              a.download = `${element.nombre}`;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        });
        }
       },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.data.response });
        }
    }
    );
  }

  public b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    let sliceSize = 512;
  
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
  
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
  
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
  
        var byteArray = new Uint8Array(byteNumbers);
  
        byteArrays.push(byteArray);
    }
  
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  getEnterprisePermissions() {
     
        this.actions = [];

              this.getEnterprisesPageableData();

              this.actions.unshift({icon: 'pi pi-download', class: 'p-button-info', actionName: 'download'})
              this.actions.unshift({icon: 'pi pi-eye', class: 'p-button-warning', actionName: 'view'})
          }

  private buildPageStructure() {
    this.tableStructure = [
       // Nueva columna para acciones
      {thead: 'Acciones', value: 'actions', ttype: 'actions', visible: true, hasFilter: false},
      {thead: 'Id', value: 'id',ttype: 'number', visible: false, hasFilter: false, filterplaceholder: 'Buscar por id'},
      {thead: 'Nombre usuario', value: 'nombreCompleto',ttype: 'text', visible: true, hasFilter: false, filterplaceholder: 'Buscar por nombre'},
      {thead: 'Tipo solicitud', value: 'nombreSolicitud',ttype: 'text', visible: true, hasFilter: false, filterplaceholder: 'Buscar por nombre'},
      {thead: 'Fecha entrega', value: 'fecha',ttype: 'text', visible: true, hasFilter: false, filterplaceholder: 'Buscar por nombre'},
      {thead: 'Estado', value: 'state',ttype: 'text', visible: true, hasFilter: false, filterplaceholder: 'Buscar por nombre'},  
    ]

    this.gobalFilters = this.tableStructure.filter(column => column.visible).map(column => column.value);
  }

  onPageChange(event: any) {

    console.log("se ejecuta el onpagechange");
    let params = { page: event.page, size: event.rows};

    this.getEnterprisesPageableData(params);
  }


  // submitUpdateEnterprise(submittedData: IUpdateEnterprise) {
  //   let createObservable = this.enterpriseService.updateEnterprise(submittedData);

  //   forkJoin([createObservable]).subscribe({
  //     next: ([updated]) => {
  //       sessionStorage.removeItem('formData');
  //       this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Empresa actualizada exitosamente.' });
  //       this.ngOnInit(); 
  //     },
  //     error: (err) => {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.data.response });
  //     }
  //   })
  // }
}
