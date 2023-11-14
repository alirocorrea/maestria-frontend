import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asignatura } from '../models/asignatura';
import { Observable, of, timeout, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Acta } from '../models/acta';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class AsignaturasService {
    private apiUrl = 'http://localhost:8021/api/asignaturas';
    private apiUrlDocentes = 'http://localhost:8091/api/docentes';
    // private asignaturas: Asignatura[] = [
    //     {
    //         id: 1,
    //         codigoAsignatura: 'CODE1',
    //         oficioFacultad: 1,
    //         lineaInvestigacionAsignatura: 1,
    //         contenidoProgramatico: 1,
    //         microcurriculo: 1,
    //         nombre: 'Asignatura 1',
    //         estado: true,
    //         fechaAprobacion: new Date(),
    //         areaFormacion: 'Área 1',
    //         tipo: 'Tipo 1',
    //         creditos: 3,
    //         objetivo: 'Objetivo 1',
    //         contenido: 'Contenido 1',
    //         horasPresenciales: 40,
    //         horaNoPresenciaels: 20,
    //         horasTotal: 60,
    //     },
    //     {
    //         id: 2,
    //         codigoAsignatura: 'CODE2',
    //         oficioFacultad: 2,
    //         lineaInvestigacionAsignatura: 2,
    //         contenidoProgramatico: 2,
    //         microcurriculo: 2,
    //         nombre: 'Asignatura 2',
    //         estado: true,
    //         fechaAprobacion: new Date(),
    //         areaFormacion: 'Área 2',
    //         tipo: 'Tipo 2',
    //         creditos: 4,
    //         objetivo: 'Objetivo 2',
    //         contenido: 'Contenido 2',
    //         horasPresenciales: 50,
    //         horaNoPresenciaels: 25,
    //         horasTotal: 75,
    //     },
    //     {
    //         id: 20,
    //         codigoAsignatura: 'CODE3',
    //         oficioFacultad: 20,
    //         lineaInvestigacionAsignatura: 20,
    //         contenidoProgramatico: 20,
    //         microcurriculo: 20,
    //         nombre: 'Asignatura 20',
    //         estado: true,
    //         fechaAprobacion: new Date(),
    //         areaFormacion: 'Área 20',
    //         tipo: 'Tipo 20',
    //         creditos: 3,
    //         objetivo: 'Objetivo 20',
    //         contenido: 'Contenido 20',
    //         horasPresenciales: 40,
    //         horaNoPresenciaels: 20,
    //         horasTotal: 60,
    //     },
    // ];
    private actas: Acta[] = [];

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    // Método para obtener la lista de docentes
    getListaDocentes(): Observable<any[]> {
        return this.http
            .get<any[]>(this.apiUrlDocentes, this.httpOptions)
            .pipe(catchError(this.handleError<any[]>('getListaDocentes', [])));
    }

    // Método para obtener la lista de asignaturas
    getListaAsignaturas(): Observable<any[]> {
        return this.http
            .get<any[]>(this.apiUrl)
            .pipe(
                catchError(this.handleError<any[]>('getListaAsignaturas', []))
            );
    }

    // Agregar un método para obtener los detalles de una asignatura por su ID
    getDetalleAsignatura(id: number): Observable<any> {
        const url = this.apiUrl + `/completa/${id}`;
        return this.http.get(url);
    }

    // Método para obtener una asignatura que sera editada
    // getAsignaturaEditar(): Observable<any[]> {
    //     return this.http
    //         .get<any[]>(this.apiUrl)
    //         .pipe(
    //             catchError(this.handleError<any[]>('getListaAsignaturas', []))
    //         );
    // }

    // Función para manejar errores
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);

            let errorMessage =
                'Ha ocurrido un error. Por favor, intenta nuevamente.';

            if (error.error) {
                if (typeof error.error === 'string') {
                    errorMessage = error.error;
                } else if (error.error instanceof ErrorEvent) {
                    errorMessage = 'Error en la conexión.';
                } else if (error.error.message) {
                    errorMessage = error.error.message;
                }
            }

            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: errorMessage,
            });

            return throwError(result as T);
        };
    }

    consultarActas(): Observable<Acta[]> {
        return of([
            {
                id: 1,
                numeroActa: '1',
                linkActa: 'https://www.google.com/?hl=es',
            },
            {
                id: 2,
                numeroActa: '2',
                linkActa: 'https://www.google.com/?hl=es',
            },
            {
                id: 3,
                numeroActa: '3',
                linkActa: 'https://www.google.com/?hl=es',
            },
            {
                id: 4,
                numeroActa: '4',
                linkActa: 'https://www.google.com/?hl=es',
            },
            {
                id: 5,
                numeroActa: '5',
                linkActa: 'https://www.google.com/?hl=es',
            },
        ]).pipe(timeout(2000));
    }

    consultarAsignaturas(): Observable<Asignatura[]> {
        //Petición al backend
        return of([
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 2,
                codigoAsignatura: 'CODE2',
                oficioFacultad: 2,
                lineaInvestigacionAsignatura: 2,
                contenidoProgramatico: 2,
                microcurriculo: 2,
                nombre: 'Asignatura 2',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Área 2',
                tipo: 'Tipo 2',
                creditos: 4,
                objetivo: 'Objetivo 2',
                contenido: 'Contenido 2',
                horasPresenciales: 50,
                horaNoPresenciaels: 25,
                horasTotal: 75,
            },
            {
                id: 20,
                codigoAsignatura: 'CODE3',
                oficioFacultad: 20,
                lineaInvestigacionAsignatura: 20,
                contenidoProgramatico: 20,
                microcurriculo: 20,
                nombre: 'Asignatura 20',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Área 20',
                tipo: 'Tipo 20',
                creditos: 3,
                objetivo: 'Objetivo 20',
                contenido: 'Contenido 20',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 1,
                codigoAsignatura: 'CODE1',
                oficioFacultad: 1,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 1',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
            {
                id: 50,
                codigoAsignatura: 'CODE50',
                oficioFacultad: 50,
                lineaInvestigacionAsignatura: 1,
                contenidoProgramatico: 1,
                microcurriculo: 1,
                nombre: 'Asignatura 50',
                estado: true,
                fechaAprobacion: new Date(),
                areaFormacion: 'Fundamentacion',
                tipo: 'Tipo 1',
                creditos: 3,
                objetivo: 'Objetivo 1',
                contenido: 'Contenido 1',
                horasPresenciales: 40,
                horaNoPresenciaels: 20,
                horasTotal: 60,
            },
        ]).pipe(timeout(2000));
    }

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    // Método para registrar la asignatura
    registrarAsignatura(asignatura: any): Observable<any> {
        return this.http
            .post<any>(this.apiUrl, asignatura, this.httpOptions)
            .pipe(catchError(this.handleError<any>('registrarAsignatura')));
    }

    // Método para validar si la asignatura
    // validarAsignaturaUnica(codigoAsignatura: string): boolean {
    //     // Verificar si el código de asignatura ya existe en el arreglo de asignaturas
    //     const existeAsignatura = this.asignaturas.some(
    //         (asignatura) => asignatura.codigoAsignatura === codigoAsignatura
    //     );
    //     return existeAsignatura;
    // }

    // Método para validar si el nombre de una asignatura existe en la base de datos
  validarNombreAsignatura(nombre: string): Observable<boolean> {
    const endpoint = `${this.apiUrl}/nombre/${nombre}`;
    debugger;
    return this.http.get<boolean>(endpoint);
  }

    private asignaturaData: any;

    // Guardar la asignatura en el servicio
    setAsignaturaData(asignatura: any) {
        this.asignaturaData = asignatura;
    }

    // Obtener la asignatura del servicio
    getAsignaturaData() {
        return this.asignaturaData;
    }

    // Limpiar la asignatura almacenada en el servicio
    clearAsignaturaData() {
        this.asignaturaData = null;
    }
}
