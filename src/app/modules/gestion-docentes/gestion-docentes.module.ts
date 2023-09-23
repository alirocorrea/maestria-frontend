import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionDocentesRoutingModule } from './gestion-docentes-routing.module';
import { PrincipalGestionDocentesComponent } from './pages/principal-gestion-docentes/principal-gestion-docentes.component';
import { SharedModule } from 'primeng/api';
import { PrimenNgModule } from '../primen-ng/primen-ng.module';


@NgModule({
  declarations: [
    PrincipalGestionDocentesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrimenNgModule,
    GestionDocentesRoutingModule
  ]
})
export class GestionDocentesModule { }
