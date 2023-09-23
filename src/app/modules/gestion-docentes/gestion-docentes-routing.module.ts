import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalGestionDocentesComponent } from './pages/principal-gestion-docentes/principal-gestion-docentes.component';
import { BandejaDocentesComponent } from './components/bandeja-docentes/bandeja-docentes.component';

const routes: Routes = [
    {
        path: '',
        component: PrincipalGestionDocentesComponent,
        children: [
            {
                path: '',
                component: BandejaDocentesComponent,
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionDocentesRoutingModule { }
