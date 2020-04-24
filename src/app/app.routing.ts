import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'pages/index',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pages/index'
  }
];

export const routing = RouterModule.forRoot(appRoutes);
