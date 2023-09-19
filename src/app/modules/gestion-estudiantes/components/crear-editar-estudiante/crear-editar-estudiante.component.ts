import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/core/components/breadcrumb/app.breadcrumb.service';
import { Estudiante } from '../../models/estudiante';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-crear-editar-estudiante',
  templateUrl: './crear-editar-estudiante.component.html',
  styleUrls: ['./crear-editar-estudiante.component.scss']
})
export class CrearEditarEstudianteComponent implements OnInit {

    loading: boolean;
    form: FormGroup;

    constructor(
        private breadcrumbService: BreadcrumbService,
        private estudianteService: EstudianteService,
        private router:Router,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.setBreadcrumb();
        this.initForm();
    }

    setBreadcrumb() {
        this.breadcrumbService.setItems([
            { label: 'Gestión' },
            { label: 'Estudiantes' , routerLink:'estudiantes' },
            { label: 'Registrar' },
        ]);
    }

    onCancel() {
        this.router.navigate(['estudiantes']);
    }

    onSave() {
        if(this.form.invalid) {
            this.personalForm.markAllAsTouched();
            this.maestriaForm.markAllAsTouched();
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
