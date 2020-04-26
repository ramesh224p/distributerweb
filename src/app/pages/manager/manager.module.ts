import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManagerRoutingModule } from './manager-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-modal';

@NgModule({
  declarations: [EmployeesComponent, ComplaintsComponent, CardComponent],
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
