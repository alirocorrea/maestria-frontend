import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { ModalidadIngreso } from 'src/app/core/enums/domain-enum';
import { enumToSelectItems } from 'src/app/core/utils/util';

@Component({
    selector: 'app-informacion-maestria',
    templateUrl: './informacion-maestria.component.html',
    styleUrls: ['./informacion-maestria.component.scss'],
})
export class InformacionMaestriaComponent implements OnInit {

    @Output() formReady = new EventEmitter<FormGroup>();

    modalidadesIngreso: SelectItem[] = enumToSelectItems(ModalidadIngreso);
    maestriaForm: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.maestriaForm = this.fb.group({
            estadoMaestria: ['', Validators.required],
            modalidad: ['', Validators.required],
            esEstudianteDoctorado: [false, Validators.required],
            tituloDoctorado: [''],
            idDirector: ['',  Validators.required],
            idCodirector: [''],
            cohorte: [null, Validators.required],
            periodoIngreso: ['', Validators.required],
            modalidadIngreso: [null],
            semestreAcademico: [null],
            semestreFinanciero: [null],
            "titulo":[''],
            "entidadAsociada": [''],
            "tipo": [null],
            "esOfrecidaPorUnicauca": [''],
            "dedicacion": [null],
        });

        this.formReady.emit(this.maestriaForm);
    }
}
