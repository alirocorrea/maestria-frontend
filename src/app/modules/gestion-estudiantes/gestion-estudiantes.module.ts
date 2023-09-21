import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionEstudiantesRoutingModule } from './gestion-estudiantes-routing.module';
import { PrimenNgModule } from '../primen-ng/primen-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrincipalGestionEstudiantesComponent } from './pages/principal-gestion-estudiantes/principal-gestion-estudiantes.component';
import { BandejaEstudiantesComponent } from './components/bandeja-estudiantes/bandeja-estudiantes.component';
import { EstudianteComponent } from './components/estudiante/estudiante.component';
import { EstudiantesService } from './services/estudiantes.service';


@NgModule({
  declarations: [
    PrincipalGestionEstudiantesComponent,
    BandejaEstudiantesComponent,
    EstudianteComponent
  ],
  imports: [
    CommonModule,
    PrimenNgModule,
    SharedModule,
    GestionEstudiantesRoutingModule
  ],
  providers: [
    EstudiantesService,
  ]
})
export class GestionEstudiantesModule { }
