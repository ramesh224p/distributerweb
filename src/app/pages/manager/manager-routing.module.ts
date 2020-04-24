import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { ComplaintsComponent } from './complaints/complaints.component';

const routes: Routes = [
  { path: 'employees', component: EmployeesComponent },
  { path: 'complaints', component: ComplaintsComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ManagerRoutingModule { }
