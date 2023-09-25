import {
    Component,
    ElementRef,
    OnInit,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { RadicarService } from '../../services/radicar.service';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

@Component({
    selector: 'app-resumen',
    templateUrl: './resumen.component.html',
    styleUrls: ['./resumen.component.scss'],
})
export class ResumenComponent implements OnInit {
    @ViewChild('lineImage', { static: true }) lineImage: ElementRef;
    @ViewChild('firmaImage') firmaImage: ElementRef;
    @ViewChild('encabezadoSolicitud') encabezadoSolicitud: ElementRef;
    @ViewChild('piePaginaSolicitud') piePaginaSolicitud: ElementRef;
    @ViewChild('contenidoSolicitud') contenidoSolicitud: ElementRef;
    @ViewChild('vistaPreviaSolicitud') vistaPreviaSolicitud: ElementRef;
    @ViewChild('proporcionContenido') proporcionContenido: ElementRef;

    imgDivEncabezado: HTMLImageElement;
    imgDivPiePagina: HTMLImageElement;
    imgDivContenido: HTMLImageElement;
    imgDivProporcionContenido: HTMLImageElement;

    segmentosContenido: HTMLImageElement[];
    espacioVacioEnPaginas: number[];

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

    constructor(
        public radicar: RadicarService,
        private router: Router,
        private renderer: Renderer2,
        private el: ElementRef
    ) {
        this.segmentosContenido = [];
        this.espacioVacioEnPaginas = [];
    }

    ngOnInit() {}

    ngAfterViewInit() {
        setTimeout(() => {
            const promesas = [
                this.convertirADivImagen('encabezadoSolicitud'),
                this.convertirADivImagen('piePaginaSolicitud'),
                this.convertirADivImagen('contenidoSolicitud'),
                this.convertirADivImagen('proporcionContenido'),
            ];

            Promise.all(promesas).then((imagenes) => {
                // Todas las promesas se han resuelto
                //console.log('Todas las conversiones han terminado.');
                // Asigna las imágenes a las variables correspondientes
                this.imgDivEncabezado = imagenes[0];
                this.imgDivPiePagina = imagenes[1];
                this.imgDivContenido = imagenes[2];
                this.imgDivProporcionContenido = imagenes[3];
                // ejecutar cualquier función después de que todas las conversiones hayan terminado.
                this.segmentarContenido();
                this.componerVistaPrevia();
            });
        }, 300);
    }

    convertirADivImagen(elementId: string) {
        const divElement = document.getElementById(elementId);

        if (!divElement) {
            return Promise.resolve(null); // Si no se encuentra el elemento, resuelve la promesa con null
        }

        return new Promise<HTMLImageElement>((resolve) => {
            html2canvas(divElement, {
                scale: 4, // Escala 4
                logging: false,
            }).then((canvas) => {
                const imagenVariable = new Image();
                imagenVariable.src = canvas.toDataURL('image/jpeg', 1.0); // Formato JPEG 1.0
                // Oculta el div
                this.renderer.setStyle(divElement, 'display', 'none');
                resolve(imagenVariable); // Resuelve la promesa con la imagen convertida
            });
        });
    }

    componerVistaPrevia() {
        const vistaPreviaDiv = this.vistaPreviaSolicitud.nativeElement;
        vistaPreviaDiv.style.width = '100%';

        vistaPreviaDiv.innerHTML = '';

        for (let i = 0; i < this.segmentosContenido.length; i++) {
            const encabezado = new Image();
            encabezado.src = this.imgDivEncabezado.src;
            encabezado.style.width = '100%';
            vistaPreviaDiv.appendChild(encabezado);

            const contenido = new Image();
            contenido.src = this.segmentosContenido[i].src;
            contenido.style.width = '100%';
            vistaPreviaDiv.appendChild(contenido);

            const valorEspacio = this.espacioVacioEnPaginas[i];

            const espacioVertical = document.createElement('div');
            espacioVertical.style.height = valorEspacio + 'px';
            vistaPreviaDiv.appendChild(espacioVertical);

            const piePagina = new Image();
            piePagina.src = this.imgDivPiePagina.src;
            piePagina.style.width = '100%';
            vistaPreviaDiv.appendChild(piePagina);
        }
    }

    segmentarContenido() {
        // Constantes
        const heightEncabezado = this.imgDivEncabezado.height;
        const heightContenido = this.imgDivContenido.height;
        const heightPiePagina = this.imgDivPiePagina.height;
        const heightLetterProporcional = this.imgDivProporcionContenido.height;
        const heightRecorte =
            heightLetterProporcional - heightEncabezado - heightPiePagina;

        let contenidoRestante = heightContenido;
        let corteY1 = 0;
        let corteY2 = heightRecorte;

        while (contenidoRestante > 0) {
            if (contenidoRestante <= heightRecorte) {
                corteY2 = heightContenido;
                contenidoRestante = 0;
            }

            //Buscar una posicion sin texto para hacer el corte
            const corteY2Adecuado = this.encontrarLineaBlancaY(
                this.imgDivContenido,
                corteY2
            );

            //Recortar el contenido con un alto adecuado para una pagina
            const imagenRecortada: HTMLImageElement =
                this.recortarImagenPorPosicionesY(
                    this.imgDivContenido,
                    corteY1,
                    corteY2Adecuado
                );
            const heightimagenRecortada = corteY2Adecuado - corteY1;

            //Amacenar el segmento en una arreglo
            this.segmentosContenido.push(imagenRecortada);

            //Calcular el espacio sobrante en la pagina
            const espacioSobrante =
                heightLetterProporcional -
                heightEncabezado -
                heightPiePagina -
                heightimagenRecortada;

            //Almacenar referencia de ese espacio
            this.espacioVacioEnPaginas.push(espacioSobrante);

            //Disminuir el contenido restante por cortar
            contenidoRestante -= heightimagenRecortada;

            //Actualizar las nuevas posiciones de recorte
            corteY1 = corteY2Adecuado;
            corteY2 = corteY2Adecuado + heightRecorte;
        }
    }

    encontrarLineaBlancaY(elementoImagen: HTMLImageElement, posicionY: number) {
        // Obtén el contexto 2D del canvas
        const canvas = document.createElement('canvas');
        canvas.width = elementoImagen.width;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');

        while (posicionY > 0) {
            // Dibuja una línea de píxeles en el contexto
            ctx.drawImage(
                elementoImagen,
                0,
                -posicionY,
                elementoImagen.width,
                elementoImagen.height
            );

            function esLineBlanca() {
                // Obtén los datos de píxeles de la línea
                const imageData = ctx.getImageData(
                    0,
                    0,
                    elementoImagen.width,
                    1
                );
                const data = imageData.data;

                // Itera a través de los datos de píxeles y verifica si todos son blancos (255, 255, 255, 255)
                for (let i = 0; i < data.length; i += 4) {
                    if (
                        data[i] !== 255 ||
                        data[i + 1] !== 255 ||
                        data[i + 2] !== 255 ||
                        data[i + 3] !== 255
                    ) {
                        // Al menos un píxel no es blanco, así que retornamos false
                        return false;
                    }
                }

                // Todos los píxeles son blancos, retornamos true
                return true;
            }

            if (esLineBlanca()) {
                return posicionY;
            } else {
                posicionY -= 5;
            }
        }

        return -1;
    }

    recortarImagenPorPosicionesY(
        imagen: HTMLImageElement,
        y1: number,
        y2: number
    ): HTMLImageElement {
        // Crear un elemento HTML canvas
        const canvas = this.renderer.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Definir el tamaño del canvas igual al tamaño de la imagen
        canvas.width = imagen.width;
        canvas.height = y2 - y1;

        // Dibujar la porción de la imagen en el canvas
        ctx.drawImage(
            imagen,
            0,
            y1,
            imagen.width,
            y2 - y1,
            0,
            0,
            imagen.width,
            y2 - y1
        );

        // Crear una nueva imagen a partir del canvas
        const imagenRecortada = new Image();
        imagenRecortada.src = canvas.toDataURL('image/jpeg', 1.0); // Puedes cambiar el formato si lo deseas

        return imagenRecortada;
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

    enviarSolicitud() {}

    navigateToBack() {
        this.router.navigate(['/gestionsolicitudes/creacion/documentos']);
    }
}
