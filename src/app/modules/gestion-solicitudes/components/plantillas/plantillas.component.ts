import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RadicarService } from '../../services/radicar.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-plantillas',
    templateUrl: './plantillas.component.html',
    styleUrls: ['./plantillas.component.scss'],
})
export class PlantillasComponent implements OnInit {
    @ViewChild('firmaRemitente') firmaRem: ElementRef;
    fechaActual: Date = new Date();
    nombresMes: string[] = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ];
    escudoUrl: string =
        'https://www.unicauca.edu.co/pis/themes/ingesis/resources/img/blue.png';

    iso900Sello: string =
        'https://www.barranquilla.gov.co/wp-content/uploads/2020/11/ico-cert-procesos.png';

    private subscription: Subscription;

    constructor(public radicar: RadicarService) {
        this.subscription = this.radicar.getClickEvent().subscribe(() => {
            this.ponerFirmaRemitente();
        });
    }

    ngOnInit(): void {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    obtenerPalabra(texto: string, posicion: number): string {
        const palabras = texto.split(' ');
        if (posicion >= 0 && posicion < palabras.length) {
            return palabras[posicion];
        }
        return '';
    }

    ponerFirmaRemitente() {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.firmaRem.nativeElement.src = e.target.result;
        };
        reader.readAsDataURL(this.radicar.firmaSolicitante);
    }
}
