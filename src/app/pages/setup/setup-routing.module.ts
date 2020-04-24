import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchesComponent } from './branches/branches.component';
import { FinancesComponent } from './finances/finances.component';

const routes: Routes = [
  { path: 'branches', component: BranchesComponent },
  { path: 'finances', component: FinancesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
