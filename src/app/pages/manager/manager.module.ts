import { NgModule } from '@angular/core';
import { Validator,NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManagerRoutingModule } from './manager-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-modal';

@NgModule({
  declarations: [EmployeesComponent, ComplaintsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ManagerRoutingModule,
  ] 
})
export class ManagerModule { }
