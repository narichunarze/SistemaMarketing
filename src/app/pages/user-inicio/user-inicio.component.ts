import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-inicio',
  providers: [MessageService],
  templateUrl: './user-inicio.component.html',
  styleUrls: ['./user-inicio.component.scss']
})
export class UserInicioComponent implements OnInit {
  constructor(private messageService: MessageService,
    private router: Router
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
  

}
