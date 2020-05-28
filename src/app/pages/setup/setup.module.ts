import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SetupRoutingModule } from './setup-routing.module';
import { BranchesComponent } from './branches/branches.component';
import { FinancesComponent } from './finances/finances.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-modal';

@NgModule({
  declarations: [BranchesComponent, FinancesComponent],
  imports: [
    CommonModule,
    SetupRoutingModule,
    NgxPaginationModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SetupModule { }
