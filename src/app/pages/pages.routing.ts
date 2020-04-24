import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';

export const childRoutes: Routes = [
    { path: 'login', component: LoginComponent, },
    {
        path: 'pages',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'index', pathMatch: 'full' },
            { path: 'index', loadChildren: './index/index.module#IndexModule' },
            { path: 'attendance', loadChildren: './attendance/attendance.module#AttendanceModule' },
            { path: 'inventory', loadChildren: './inventory/inventory.module#InventoryModule' },
            { path: 'setup', loadChildren: './setup/setup.module#SetupModule' },
            { path: 'reports', loadChildren: './reports/reports.module#ReportsModule' },
            { path: 'manager', loadChildren: './manager/manager.module#ManagerModule'},
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
