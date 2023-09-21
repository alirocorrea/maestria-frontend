import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TiposSolicitudResponse, RequisitosSolicitudResponse } from '../models';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(private http: HttpClient) {}

    obtenerTiposDeSolicitud() {
        const url =
            'http://localhost:8095/msmaestriac/gestionSolicitud/tiposSolicitud';
        return this.http.get<TiposSolicitudResponse>(url).pipe(
            map((respuesta) => {
                return respuesta.tipoSolicitudDto;
            })
        );
    }

    obtenerRequisitosDeSolicitud(codigo: string) {
        const url =
            'http://localhost:8095/msmaestriac/gestionSolicitud/requisitoSolicitud/' +
            codigo;
        return this.http.get<RequisitosSolicitudResponse>(url).pipe(
            map((respuesta) => {
                return respuesta.doRequeridoSolicitudDto;
            })
        );
    }
}
