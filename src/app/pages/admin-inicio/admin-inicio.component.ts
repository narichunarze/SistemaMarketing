import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { ColumnStructure, FormConfig } from 'src/app/demo/domain/columnDataStructure';
import { PermissionService } from 'src/app/services/permission/permission.service';
import { SolicitudService } from 'src/app/services/solicitudes/solicitudes.service';

@Component({
  selector: 'app-admin-inicio',
  templateUrl: './admin-inicio.component.html',
  providers: [MessageService],  
  styleUrls: ['./admin-inicio.component.scss']
})
export class AdminInicioComponent {

  pieData: any;
  pieOptions: any;

  totalQuantity: number = 0;
  rgbColors = [
      'rgb(255, 205, 86)', //1 Amarillo claro
      'rgb(75, 192, 192)', //2 Verde agua
      'rgb(255, 195, 0)',  //3 Amarillo pastel
      'rgb(76, 245, 56)',  //4 Verde lima claro
      'rgb(81, 252, 244)', //5 Celeste claro
      'rgb(203, 81, 252)', //6 Morado claro
      'rgb(255, 182, 193)', //7 Rosa pastel
      'rgb(255, 223, 186)', //8 Durazno claro
      'rgb(173, 216, 230)', //9 Azul pastel
      'rgb(144, 238, 144)', //10 Verde claro
      'rgb(255, 240, 245)', //11 Lavanda claro
      'rgb(221, 160, 221)', //12 Orquídea pastel
      'rgb(230, 230, 250)', //13 Lavanda
      'rgb(250, 235, 215)', //14 Antiguo blanco
      'rgb(240, 255, 240)', //15 Menta suave
      'rgb(250, 250, 210)', //16 Amarillo claro pastel
      'rgb(255, 239, 213)', //17 Durazno pastel
      'rgb(245, 222, 179)', //18 Trigo suave
      'rgb(255, 228, 225)', //19 Rosa niebla
      'rgb(255, 250, 205)'  //20 Amarillo suave
  ];

  cols: any[];

  chartData: any;

  chartOptions: any;

  selectedTask: string[] = [];

  charData: any;

  //Estructura pagina

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
    private messageService: MessageService,
  ) {

  }

  ngOnInit(): void {
    this.buildPageStructure();
    this.getSolicitudesData();
    this.getCharInfoValues();

    let valor = sessionStorage.getItem('evento') ?? '';
    if(!!valor){
      setTimeout(() => {
        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Usuario creado exitosamente.' });
      }, 500);  // 500 milisegundos (0.5 segundos)
      sessionStorage.removeItem('evento');
    }
  }

  ngOnDestroy(): void {
  }


  private getCharInfoValues(dateValue: String = '') {
    let charInfoDataObservable = this.solicitudService.getCharInfo();

    forkJoin([charInfoDataObservable]).subscribe({
        next:([data]) => {
            this.charData = data.data ?? [];
        },
        complete: () => {
            var labels = [];
            var values = [];

            this.totalQuantity = 0;

            this.charData.forEach((data) => {
                labels.push(data.estado);
                values.push(data.cantidad);

                this.totalQuantity = this.totalQuantity + data.cantidad;
            });

            this.buildDoughnut(labels, values);
        }
    });
  }

  private buildDoughnut(labelsData, valuesData) {
    this.pieData = {
        labels: labelsData,
        datasets: [
            {
                data: valuesData,
                backgroundColor: this.rgbColors
            }]
    };

    this.pieOptions = {
        plugins: {
            legend: {
                labels: {
                    fontColor: '#A0A7B5'
                }
            }
        }
    };
  }

  private getSolicitudesData(params: any = { page: 0, size: 5, tipoSolicitud: '' }) {
    let solicitudObservable = this.solicitudService.getSolicitudesPageable(params);

    forkJoin([solicitudObservable]).subscribe(
        ([solicitudes]) => {
            this.pageableData = solicitudes.data;
        }
    );
  }

  onPageChange(event: any) {

    console.log("se ejecuta el onpagechange");
    let params = { page: event.page, size: event.rows};

    this.getSolicitudesData(params);
  }

  private buildPageStructure() {
    this.tableStructure = [
       // Nueva columna para acciones
      {thead: 'Id', value: 'id',ttype: 'number', visible: false, hasFilter: false, filterplaceholder: 'Buscar por id'},
      {thead: 'Nombre usuario', value: 'nombreCompleto',ttype: 'text', visible: true, hasFilter: false, filterplaceholder: 'Buscar por nombre'},
      {thead: 'Tipo solicitud', value: 'nombreSolicitud',ttype: 'text', visible: true, hasFilter: false, filterplaceholder: 'Buscar por nombre'},
      {thead: 'Fecha entrega', value: 'fecha',ttype: 'text', visible: true, hasFilter: false, filterplaceholder: 'Buscar por nombre'},
      {thead: 'Estado', value: 'state',ttype: 'text', visible: true, hasFilter: false, filterplaceholder: 'Buscar por nombre'},  
    ]

    this.gobalFilters = this.tableStructure.filter(column => column.visible).map(column => column.value);
  }

  navigateToArte() {
    this.router.navigate([`/dashboard/admin-artes`]);
  }
  navigateToVideo() {
    this.router.navigate([`/dashboard/admin-video`]);
  }
  navigateToEvento() {
    this.router.navigate([`/dashboard/admin-evento`]);
  }
  navigateToPodcast() {
    this.router.navigate([`/dashboard/admin-podcast`]);
  }
  navigateToRegistrar() {
    this.router.navigate([`/dashboard/admin-registrar`]);
  }
}
