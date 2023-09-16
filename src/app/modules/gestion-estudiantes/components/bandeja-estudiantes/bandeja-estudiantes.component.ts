import { Component, OnInit } from '@angular/core';
import { Estuadiante } from '../../models/estudiante';
import { EstudianteService } from '../../services/estudiante.service';
import { BreadcrumbService } from 'src/app/core/components/breadcrumb/app.breadcrumb.service';
import { Router } from '@angular/router';
import { EstadoMastria } from 'src/app/core/enums/domain-enum';

@Component({
    selector: 'app-bandeja-estudiantes',
    templateUrl: './bandeja-estudiantes.component.html',
    styleUrls: ['./bandeja-estudiantes.component.scss'],
})
export class BandejaEstudiantesComponent implements OnInit {

    loading: boolean;
    estudiantes: Estuadiante[] = [];

    constructor(
        private breadcrumbService: BreadcrumbService,
        private estudianteService: EstudianteService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.setBreadcrumb();
        this.listEstudiantes();
    }

    listEstudiantes() {
        this.loading = true;
        this.estudianteService.listEstudiantes().subscribe({
            next: (response) => this.estudiantes = response,
        }).add(() => this.loading = false);
    }

    setBreadcrumb() {
        this.breadcrumbService.setItems([
            { label: 'Gestión' },
            { label: 'Estudiantes' },
        ]);
    }

    onRegistrarEstudiante() {
        this.router.navigate(['estudiantes/registrar']);
    }

    onCargaExitosa() {
        this.listEstudiantes();
    }

    getEstadoMaestria(codigo: string) {
        return EstadoMastria[codigo]
    }

    onVerEstados(id: number) {
        this.router.navigate(['estudiantes/estados', id]);
    }
}
