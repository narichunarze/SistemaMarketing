import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SolicitudService } from 'src/app/services/solicitudes/solicitudes.service';

@Component({
  selector: 'app-user-inicio',
  providers: [MessageService],
  templateUrl: './user-inicio.component.html',
  styleUrls: ['./user-inicio.component.scss']
})
export class UserInicioComponent implements OnInit {

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

  constructor(private messageService: MessageService,
    private solicitudService: SolicitudService,
    private router: Router,
  ) {}

  navigateToArte() {
    this.router.navigate([`/dashboard/user-artes`]);
  }
  navigateToVideo() {
    this.router.navigate([`/dashboard/user-video`]);
  }
  navigateToEvento() {
    this.router.navigate([`/dashboard/user-evento`]);
  }
  navigateToPodcast() {
    this.router.navigate([`/dashboard/user-podcast`]);
  } 
  //siempre muestra el evento de artes exitoso
  ngOnInit(): void {
    this.getCharInfoValues();

    let valor = sessionStorage.getItem('evento') ?? '';
    if(!!valor){
      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: `Evento ${valor} creado exitosamente.`
        });
      }, 500);  // 500 milisegundos (0.5 segundos)
      sessionStorage.removeItem('evento');
    }
    
  }

  private getCharInfoValues(dateValue: String = '') {
    let charInfoDataObservable = this.solicitudService.getUserCharInfo();

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

}
