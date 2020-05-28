import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { IndentComponent } from './indent/indent.component';
import { ListIndentComponent } from './list-indent/list-indent.component';
import { AcknowledgementComponent } from './acknowledgement/acknowledgement.component';
import { InventoryAssignComponent } from './inventory-assign/inventory-assign.component';
import { InventoryAssignlistComponent } from './inventory-assignlist/inventory-assignlist.component';

const routes: Routes = [
  { path: 'inventory-details', component: InventoryDetailsComponent },
  { path: 'indent', component: IndentComponent },
  { path: 'list-indent', component: ListIndentComponent },
  { path: 'acknowledgement', component: AcknowledgementComponent },
  { path: 'inventory-assign', component: InventoryAssignComponent },
  { path: 'inventory-assignlist', component: InventoryAssignlistComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
