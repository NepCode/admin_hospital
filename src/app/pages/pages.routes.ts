import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

//GUARDS
import { LoginGuardGuard, AdminGuard } from '../services/service.index';

import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {titulo:'Dashboard'} },
            { path: 'progress', component: ProgressComponent , data: {titulo:'Progress'}},
            { path: 'graficas1', component: Graficas1Component , data: {titulo:'Graficas1'}},
            { path: 'promesas', component: PromesasComponent , data: {titulo:'Promesas'}},
            { path: 'rxjs', component: RxjsComponent , data: {titulo:'Rxjs'}},
            { path: 'account-settings', component: AccountSettingsComponent , data: {titulo:'Themes'}},
            { path: 'profile', component: ProfileComponent , data: {titulo:'Profile'}},
            { path: 'busqueda/:termino', component: BusquedaComponent , data: {titulo:'Busqueda'}},

            //mantenimientos
            { 
                path: 'usuarios', 
                component: UsersComponent ,
                canActivate: [AdminGuard], 
                data: {titulo:'Mantenimiento de Usuarios '}
            },
            
            { path: 'hospitales', component: HospitalesComponent , data: {titulo:'Mantenimiento de Hospitales '}},
            { path: 'medicos', component: MedicosComponent , data: {titulo:'Mantenimiento de medicos '}},
            { path: 'medico/:id', component: MedicoComponent , data: {titulo:'Medicos '}},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
