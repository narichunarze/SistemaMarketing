import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-inicio',
  templateUrl: './admin-inicio.component.html',
  styleUrls: ['./admin-inicio.component.scss']
})
export class AdminInicioComponent {

  constructor(private router: Router) {}

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
