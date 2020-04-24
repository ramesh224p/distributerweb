import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { IndentComponent } from './indent/indent.component';
import { ListIndentComponent } from './list-indent/list-indent.component';
import { AcknowledgementComponent } from './acknowledgement/acknowledgement.component';

const routes: Routes = [
  { path: 'inventory-details', component: InventoryDetailsComponent },
  { path: 'indent', component: IndentComponent },
  { path: 'list-indent', component: ListIndentComponent },
  { path: 'acknowledgement', component: AcknowledgementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
