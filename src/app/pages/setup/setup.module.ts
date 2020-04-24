import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupRoutingModule } from './setup-routing.module';
import { BranchesComponent } from './branches/branches.component';
import { FinancesComponent } from './finances/finances.component';

@NgModule({
  declarations: [BranchesComponent, FinancesComponent],
  imports: [
    CommonModule,
    SetupRoutingModule
  ]
})
export class SetupModule { }
