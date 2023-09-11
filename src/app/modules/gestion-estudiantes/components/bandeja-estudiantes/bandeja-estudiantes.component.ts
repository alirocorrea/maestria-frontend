import { Component, OnInit } from '@angular/core';
import { Estuadiante } from '../../models/estudiante';
import { EstudiantesService } from '../../services/estudiantes.service';
import { BreadcrumbService } from 'src/app/core/components/breadcrumb/app.breadcrumb.service';

@Component({
    selector: 'app-bandeja-estudiantes',
    templateUrl: './bandeja-estudiantes.component.html',
    styleUrls: ['./bandeja-estudiantes.component.scss'],
})
export class BandejaEstudiantesComponent implements OnInit {

    loading: boolean;

    constructor(private breadcrumbService: BreadcrumbService) {}

    ngOnInit(): void {
        this.setBreadcrumb();
    }

    setBreadcrumb() {
        this.breadcrumbService.setItems([
            { label: 'Gestión' },
            { label: 'Estudiantes' },
        ]);
    }
}
