import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/core/components/breadcrumb/app.breadcrumb.service';

@Component({
  selector: 'app-crear-editar-estudiante',
  templateUrl: './crear-editar-estudiante.component.html',
  styleUrls: ['./crear-editar-estudiante.component.scss']
})
export class CrearEditarEstudianteComponent implements OnInit {

    loading: boolean;

    constructor(
        private breadcrumbService: BreadcrumbService,
        private router:Router,
    ) {}

    ngOnInit(): void {
        this.setBreadcrumb();
    }

    setBreadcrumb() {
        this.breadcrumbService.setItems([
            { label: 'Gestión' },
            { label: 'Estudiantes' , routerLink:'estudiantes' },
            { label: 'Registrar' },
        ]);
    }

    onCancelar() {
        this.router.navigate(['estudiantes']);
    }

}
