import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RadicarService } from '../../services/radicar.service';
import { DatosSolicitante } from '../../models';

@Component({
    selector: 'app-solicitante',
    templateUrl: './datos.component.html',
    styleUrls: ['./datos.component.scss'],
})
export class DatosComponent implements OnInit {
    datosSolicitante: DatosSolicitante;
    tiposIdentificacion: String[];
    ofertaAcademica: any[];
    listadoTutores: any[];
    tutorSeleccionado: any;

    tipoSolicitudEscogida: any;

    variableprovisional: boolean = false;

    constructor(public radicar: RadicarService, private router: Router) {
        this.tiposIdentificacion = [
            'Cédula de ciudadania',
            'Cédula de extrangeria',
            'Tarjeta de identidad',
            'Pasaporte',
        ];

        this.tipoSolicitudEscogida = this.radicar.tipoSolicitudEscogida;
    }

    ngOnInit(): void {
        this.recuperarOfertaAcademica();
        this.recuperarListadoTutores();
    }

    agregarInstancia() {
        this.radicar.numeroInstAsignHomologar++;
        this.radicar.instanciasAsignHomologar.push({});
    }

    eliminarInstancia(index: number) {
        this.radicar.datosAsignaturasAHomologar.splice(index, 1);
        this.radicar.instanciasAsignHomologar.splice(index, 1);
    }

    recuperarOfertaAcademica() {
        this.ofertaAcademica = [
            { codigo: 'TC34', nombre: 'Teoria de la Computación' },
            { codigo: 'QC835', nombre: 'Computacion Cauntica' },
            { codigo: 'ALG546', nombre: 'Algoritmia' },
            { codigo: 'TPD342', nombre: 'Pedagogia' },
            { codigo: 'ESL657', nombre: 'Estructura de lenguajes' },
        ];
    }

    recuperarListadoTutores() {
        this.listadoTutores = [
            {
                id: '1',
                nombre: 'Carlos Ramirez',
                correo: 'corlosramirez@unicauca.edu.co',
            },
            {
                id: '2',
                nombre: 'Sandra Martinez',
                correo: 'sandramartinez@unicauca.edu.co',
            },
            {
                id: '3',
                nombre: 'Arturo Restrepo',
                correo: 'arturores@unicauca.edu.co',
            },
        ];
    }

    navigateToNext() {
        /*
        this.radicar.setDatosSolicitante(this.datosSolicitante);
        this.radicar.setMaterias(this.materiasSeleccionadas);
        */
        this.router.navigate(['/gestionsolicitudes/creacion/documentos']);
    }

    navigateToBack() {
        /*
        this.radicar.setDatosSolicitante(this.datosSolicitante);
        this.radicar.setMaterias(this.materiasSeleccionadas);
        */
        this.router.navigate(['/gestionsolicitudes/creacion/selector']);
    }
}
