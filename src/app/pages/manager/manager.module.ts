import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { ComplaintsComponent } from './complaints/complaints.component';

@NgModule({
  declarations: [EmployeesComponent, ComplaintsComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
  ] 
})
export class ManagerModule { }
