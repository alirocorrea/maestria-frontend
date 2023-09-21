import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
    DatosSolicitante,
    RequisitosSolicitud,
    TipoSolicitud,
} from '../models';
import { Solicitante } from '../models/solicitante.model';

@Injectable({
    providedIn: 'root',
})
export class RadicarService {
    private clickSubject = new Subject<void>();

    tipoSolicitudEscogida: TipoSolicitud;
    requisitosSolicitudEscogida: RequisitosSolicitud;
    solicitante: DatosSolicitante = new DatosSolicitante();
    documentosAdjuntos: File[] = [];
    motivoDeSolicitud: string = '';
    tutor: any;
    firmaSolicitante: File = null;
    firmaTutor: File = null;
    firmaDirector: File = null;

    asignaturasAdicCancel: any[] = [];

    numeroInstAsignHomologar: number = 1;
    instanciasAsignHomologar: any[] = [{}];
    datosInstitucionHomologar: { institucion: string; programa: string }[] = [];
    datosAsignaturasAHomologar: {
        asignatura: string;
        creditos: number;
        intensidad: number;
        calificacion: number;
        contenidos: File[];
    }[] = [];

    constructor() {}

    restrablecerValores() {
        this.tipoSolicitudEscogida = null;
        this.asignaturasAdicCancel = [];
        this.documentosAdjuntos = [];
        this.tutor = null;
        this.motivoDeSolicitud = '';
        this.numeroInstAsignHomologar = 1;
        this.instanciasAsignHomologar = [{}];
        this.datosAsignaturasAHomologar = [];
    }

    agregarInstancia() {
        this.numeroInstAsignHomologar++;
        this.instanciasAsignHomologar.push({});
    }

    eliminarInstancia(index: number) {
        this.instanciasAsignHomologar.splice(index, 1);
    }

    sendClickEvent() {
        this.clickSubject.next();
    }

    getClickEvent() {
        return this.clickSubject.asObservable();
    }
}
