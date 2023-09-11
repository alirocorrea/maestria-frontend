import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Mensaje } from 'src/app/core/enums/enums';
import { infoMessage } from 'src/app/core/utils/message-util';

@Component({
    selector: 'app-cargar-estudiantes',
    templateUrl: './cargar-estudiantes.component.html',
    styleUrls: ['./cargar-estudiantes.component.scss'],
})
export class CargarEstudiantesComponent implements OnInit {

    file: File;
    loading: boolean;
    labelFile: string = null;

    constructor(
        private messageService: MessageService,
    ) {}

    ngOnInit(): void {}

    onFileSelected(event: any) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            this.file = selectedFile;
            this.labelFile = this.file.name + ' - ' + (this.file.size / 1024).toFixed(0) + ' KB';
        }
    }

    onCargar() {
        this.loading = true;
        setTimeout(() => {
            this.onReset();
            this.messageService.add(infoMessage(Mensaje.REGISTRO_ESTUDIANTES_EXITOSO))
        }, 1000);
    }

    onReset() {
        this.file = null
        this.loading = false;
        this.labelFile = null;
    }
}
