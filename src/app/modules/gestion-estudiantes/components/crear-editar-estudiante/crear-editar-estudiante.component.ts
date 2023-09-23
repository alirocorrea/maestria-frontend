import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/core/components/breadcrumb/app.breadcrumb.service';
import { Estudiante } from '../../models/estudiante';
import { EstudianteService } from '../../services/estudiante.service';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { errorMessage, infoMessage, warnMessage } from 'src/app/core/utils/message-util';
import { Mensaje } from 'src/app/core/enums/enums';
import { confirmMessage } from '../../../../core/utils/message-util';

@Component({
  selector: 'app-crear-editar-estudiante',
  templateUrl: './crear-editar-estudiante.component.html',
  styleUrls: ['./crear-editar-estudiante.component.scss']
})
export class CrearEditarEstudianteComponent implements OnInit {

    loading: boolean;
    editMode: boolean;
    form: FormGroup;

    constructor(
        private breadcrumbService: BreadcrumbService,
        private estudianteService: EstudianteService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router:Router,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.initForm();
        if (this.router.url.includes('editar')) {
            this.loadEditMode();
        }
        this.setBreadcrumb();
    }

    setBreadcrumb() {
        this.breadcrumbService.setItems([
            { label: 'Gestión' },
            { label: 'Estudiantes' , routerLink:'estudiantes' },
            { label: this.editMode ? 'Editar' : 'Registrar' },
        ]);
    }

    loadEditMode() {
        this.editMode = true;
        this.loadEstudiante();
    }

    loadEstudiante() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.estudianteService.getEstudiante(id).subscribe({
            next: (response) => this.setValuesForm(response),
        });
    }

    setValuesForm(estudiante: Estudiante) {
        this.personalForm.patchValue({
            ...estudiante,
            ...estudiante.persona,
            ...estudiante.caracterizacion,
        });

        this.maestriaForm.patchValue({
            ...estudiante,
            ...estudiante.informacionMaestria,
            ...estudiante.beca,
        })
    }

    onCancel() {
        if(this.form.pristine) {
            this.router.navigate(['estudiantes']);
            return;
        }
        this.confirmationService.confirm({
            ...confirmMessage(Mensaje.CONFIRMAR_SALIR_SIN_GUARDAR),
            accept: () => this.router.navigate(['estudiantes']),
        });
    }

    onSave() {
        if(this.form.invalid) {
            this.personalForm.markAllAsTouched();
            this.maestriaForm.markAllAsTouched();
            this.messageService.clear();
            this.messageService.add(warnMessage(Mensaje.REGISTRE_CAMPOS_OBLIGATORIOS));
            return;
        }

        const request = this.mapRequest();
        this.estudianteService.createEstudiante(request).subscribe({
            next: () => this.onCancel()
        });
    }

    initForm(): void {
        this.form = this.fb.group({
            personal: this.fb.group({}),
            maestria: this.fb.group({}),
        });
    }

    addForm(name: string, group: FormGroup) {
        this.form.setControl(name, group);
    }

    mapRequest(): Estudiante {
        const personalValue = this.personalForm.getRawValue();
        const maestriaValue = this.maestriaForm.getRawValue();

        return {
          codigo: personalValue.codigo,
          persona: {
            ...personalValue,
            correoElectronico: personalValue.correoUniversidad,
          },
          correoUniversidad: personalValue.correoUniversidad,
          tituloPregrado: personalValue.tituloPregrado,
          idDirector: maestriaValue.idDirector,
          idCodirector: maestriaValue.idCodirector,
          caracterizacion: {
            ...personalValue,
          },
          informacionMaestria: {
            ...maestriaValue,
          },
          beca: {
            ...maestriaValue,
            esOfrecidaPorUnicauca: maestriaValue.esOfrecidaPorUnicauca,
          },
          prorrogas: [],
          reingresos: [],
        };
      }

    get personalForm(): FormGroup {
        return this.form.get('personal') as FormGroup;
    }

    get maestriaForm(): FormGroup {
        return this.form.get('maestria') as FormGroup;
    }
}
