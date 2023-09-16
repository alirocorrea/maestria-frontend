import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/core/components/breadcrumb/app.breadcrumb.service';

@Component({
    selector: 'app-estados-estudiante',
    templateUrl: './estados-estudiante.component.html',
    styleUrls: ['./estados-estudiante.component.scss'],
})
export class EstadosEstudianteComponent implements OnInit {

    loading: boolean;
    estadoRadioButton: string;

    constructor(private breadcrumbService: BreadcrumbService) {}

    ngOnInit(): void {
        this.setBreadcrumb();
    }

    setBreadcrumb() {
        this.breadcrumbService.setItems([
            { label: 'Gestión' },
            { label: 'Estudiantes' , routerLink:'estudiantes' },
            { label: 'Estados' },
        ]);
    }
}
