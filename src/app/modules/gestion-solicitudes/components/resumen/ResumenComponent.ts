import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RadicarService } from '../../services/radicar.service';
import jsPDF from 'jspdf';
import html2canvas, { Options } from 'html2canvas';

@Component({
    selector: 'app-resumen',
    templateUrl: './resumen.component.html',
    styleUrls: ['./resumen.component.scss'],
})
export class ResumenComponent implements OnInit {
    @ViewChild('content', { static: false }) content: ElementRef;
    @ViewChild('imgoficio') imageContainer: ElementRef;
    @ViewChild('firmaImage') firmaImage: ElementRef;

    firmaEnProceso = false;
    mostrarBtnFirmar = false;
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

    constructor(public radicar: RadicarService, private router: Router) {}

    ngOnInit(): void {}

    ngAfterViewInit() {
        this.convertirContenidoAImg();
    }

    convertirContenidoAImg() {
        // Obtiene una referencia al elemento del div original y al div de la imagen
        const originalElement = this.content.nativeElement;
        originalElement.style.display = '';

        const imageElement = this.imageContainer.nativeElement;

        const scale = 4;

        // Usa html2canvas para capturar el contenido del div original como una imagen
        html2canvas(originalElement, { scale: scale }).then((canvas) => {
            // Elimina cualquier contenido existente en el div de la imagen
            while (imageElement.firstChild) {
                imageElement.removeChild(imageElement.firstChild);
            }
            // Crea una imagen a partir del canvas y la agrega al div de la imagen
            const img = new Image();
            img.src = canvas.toDataURL('image/png');

            // Establece el ancho y alto de la imagen para que coincida con el div #imgoficio
            img.style.width = '100%';
            img.style.height = '100%';

            imageElement.appendChild(img);

            // Oculta el div original
            originalElement.style.display = 'none';
        });
    }

    generarPDF() {
        const div = this.imageContainer.nativeElement;
        const scale = 4;

        html2canvas(div, { scale: scale }).then((canvas) => {
            const imgData = canvas.toDataURL('image/jpeg', 1.0); // Cambiamos a JPEG con calidad máxima (1.0)
            const pdf = new jsPDF('p', 'mm', 'letter');

            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight); // Cambiamos 'PNG' a 'JPEG'
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight); // Cambiamos 'PNG' a 'JPEG'
                heightLeft -= pageHeight;
            }

            pdf.save('Oficio de Solicitud.pdf');
        });
    }

    firmarSolicitud() {
        this.firmaEnProceso = true;
        this.radicar.sendClickEvent();

        setTimeout(() => {
            this.convertirContenidoAImg();
            this.firmaEnProceso = false;
            this.mostrarBtnFirmar = false;
        }, 1500);
    }

    onUpload(event, firmante) {
        this.radicar.firmaSolicitante = event.files[0];
        firmante.clear();
        this.mostrarBtnFirmar = true;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.firmaImage.nativeElement.src = e.target.result;
        };
        reader.readAsDataURL(this.radicar.firmaSolicitante);
    }

    enviarSolicitud() {
        this.generarPDF();
    }

    navigateToBack() {
        this.router.navigate(['/gestionsolicitudes/creacion/documentos']);
    }
}
