import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Estuadiante } from '../models/estudiante';
import { backend } from 'src/app/core/constants/api-url';
import { getHeaders } from 'src/app/core/constants/header';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  constructor(private http: HttpClient) { }

  fetchEstudiantes(): Observable<Estuadiante[]>{
    return of([
        { nombre: 'Estudiante 1', correo: 'estudiante1@example.com', id: 1 },
        { nombre: 'Estudiante 2', correo: 'estudiante2@example.com', id: 2 }
      ]).pipe(delay(1000));;
  }
}
