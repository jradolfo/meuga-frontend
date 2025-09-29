import { Routes } from '@angular/router';
import { GastosMensais } from './pages/gastos-mensais/gastos-mensais';
import { Grupos } from './pages/grupos/grupos';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';


export const routes: Routes = [
    {
        path: 'gastos-mensais', 
        component: GastosMensais,
        data: { title: 'Gastos Mensais' }
    },
    {
        path: 'grupos',
        component: Grupos,
        data: { title: 'Grupos' }
    },
    {
        path: 'usuarios',
        component: UsuariosComponent,
        data: { title: 'Usuários' }
    },
];
