import { Component, OnInit } from '@angular/core';
import { Estuadiante } from '../../models/estudiante';
import { EstudiantesService } from '../../services/estudiantes.service';

@Component({
  selector: 'app-bandeja-estudiantes',
  templateUrl: './bandeja-estudiantes.component.html',
  styleUrls: ['./bandeja-estudiantes.component.scss']
})
export class BandejaEstudiantesComponent implements OnInit {

    loading: boolean = false;

    estudiantes: Estuadiante[] = [];
    estudiante: Estuadiante = null;

  constructor(private estudianteService: EstudiantesService) { }

  ngOnInit(): void {
    this.fetchEstudiantes();
  }

  fetchEstudiantes() {
    this.loading = true;
    this.estudianteService.fetchEstudiantes().subscribe({
        next: (response) => this.estudiantes = response,
        error: (error) => console.log(error),
        complete: () => this.loading = false,
    });
  }

}
