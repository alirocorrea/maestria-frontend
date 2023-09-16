import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionEstudiantesRoutingModule } from './gestion-estudiantes-routing.module';
import { PrimenNgModule } from '../primen-ng/primen-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrincipalGestionEstudiantesComponent } from './pages/principal-gestion-estudiantes/principal-gestion-estudiantes.component';
import { BandejaEstudiantesComponent } from './components/bandeja-estudiantes/bandeja-estudiantes.component';
import { EstudiantesService } from './services/estudiantes.service';
import { CargarEstudiantesComponent } from './components/cargar-estudiantes/cargar-estudiantes.component';
import { MessageService } from 'primeng/api';
import { EstadosEstudianteComponent } from './components/estados-estudiante/estados-estudiante.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PrincipalGestionEstudiantesComponent,
    BandejaEstudiantesComponent,
    CargarEstudiantesComponent,
    EstadosEstudianteComponent
  ],
  imports: [
    CommonModule,
    PrimenNgModule,
    SharedModule,
    GestionEstudiantesRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    MessageService,
    EstudiantesService,
  ]
})
export class GestionEstudiantesModule { }
