import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { RolService } from 'src/app/services/roles/rol.service';
import { SolicitudService } from 'src/app/services/solicitudes/solicitudes.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-registrar',
  templateUrl: './admin-registrar.component.html',
  providers: [MessageService],
  styleUrls: ['./admin-registrar.component.scss']
})
export class AdminRegistrarComponent implements OnInit {
  formGroup: FormGroup;
  permissions: any[] = [];

  constructor(private router: Router,
    private messageService: MessageService,
    private rolService: RolService,
    private userService: UserService,
  ) {
  }

  //formulario con estos campos
  ngOnInit(): void {
    this.getRolList();

    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordComfir: new FormControl('', [Validators.required]),
      idRol: new FormControl('', [Validators.required]),
    });
  }
  
  enviarFormulario() {

    let createObservable = this.userService.createUser(this.formGroup.value);

    forkJoin([createObservable]).subscribe({
      next:  ([created]) => {
      }, 
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.data.response });
      },
      complete: () => {
        sessionStorage.setItem('evento', 'podcast')
        this.router.navigate(['/dashboard/admin-index'])
      }
    }
    )
  }

  private getRolList() {
    let rolObservable = this.rolService.getPermissionsByRol();

    forkJoin([rolObservable]).subscribe(
      ([rol]) => {
        this.permissions = rol.data.filter((p) => 
          p.name === 'ADMIN' || p.name === 'USER'
        );
      }
    );
}

}