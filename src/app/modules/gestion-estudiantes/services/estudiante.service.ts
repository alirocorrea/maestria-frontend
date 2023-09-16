import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Estuadiante } from '../models/estudiante';
import { backend } from 'src/app/core/constants/api-url';
import { getHeaders } from 'src/app/core/constants/header';
import { EstadoEstudiante } from '../models/estado-estudiante';

@Injectable({
    providedIn: 'root',
})
export class EstudianteService {

    constructor(private http: HttpClient) {}

    listEstudiantes(): Observable<Estuadiante[]> {
        return this.http.get<Estuadiante[]>(
            backend('estudiantes'),
            { headers: getHeaders() }
        );
    }

    uploadEstudiantes(file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post(
            backend('estudiantes/upload'),
            formData
        );
    }

    getEstadoEstudiante(id: number) {
        return this.http.get<EstadoEstudiante>(
            backend(`estudiantes/ver-estado/${id}`),
            { headers: getHeaders() }
        );
    }
}
