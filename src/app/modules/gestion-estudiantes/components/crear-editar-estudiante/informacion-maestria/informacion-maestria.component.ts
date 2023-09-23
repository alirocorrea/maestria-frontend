import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DedicacionBeca, ModalidadIngreso, TipoBeca } from 'src/app/core/enums/domain-enum';
import { enumToSelectItems } from 'src/app/core/utils/util';
import { BuscadorDocentesComponent } from 'src/app/shared/components/buscador-docentes/buscador-docentes.component';

@Component({
    selector: 'app-informacion-maestria',
    templateUrl: './informacion-maestria.component.html',
    styleUrls: ['./informacion-maestria.component.scss'],
})
export class InformacionMaestriaComponent implements OnInit {

    @Output() formReady = new EventEmitter<FormGroup>();

    modalidadesIngreso: SelectItem[] = enumToSelectItems(ModalidadIngreso);
    tiposBeca: SelectItem[] = enumToSelectItems(TipoBeca);
    dedicacionesBeca: SelectItem[] = enumToSelectItems(DedicacionBeca);

    maestriaForm: FormGroup;

    constructor(
        private dialogService: DialogService,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.maestriaForm = this.fb.group({
            estadoMaestria: ['', Validators.required],
            modalidad: ['', Validators.required],
            esEstudianteDoctorado: ['', Validators.required],
            tituloDoctorado: [''],
            director: [null,  Validators.required],
            codirector: [null],
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

    getFormControl(formControlName: string): FormControl {
        return this.maestriaForm.get(formControlName) as FormControl;
    }

    get director(): FormControl {
        return this.maestriaForm.get('director') as FormControl;
    }

    get codirector(): FormControl {
        return this.maestriaForm.get('codirector') as FormControl;
    }

    showBuscadorDocentes() {
        return this.dialogService.open(BuscadorDocentesComponent, {
            header: "Seleccionar docente",
            width: "60%",
        });
    }

    onSeleccionarDirector() {
        const ref = this.showBuscadorDocentes();
        ref.onClose.subscribe({
            next: (response) => {
                if (response) {
                    const director = {
                        id: response.id,
                        nombre: response.persona.nombre,
                        apellido: response.persona.apellido,
                    };
                    this.director.setValue(director);
                }
            }
        });
    }

    onSeleccionarCodirector() {
        const ref = this.showBuscadorDocentes();
        ref.onClose.subscribe({
            next: (response) => {
                if (response) {
                    const codirector = {
                        id: response.id,
                        nombre: response.persona.nombre,
                        apellido: response.persona.apellido,
                    };
                    this.codirector.setValue(codirector);
                }
            }
        });
    }
}
