import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { IndentComponent } from './indent/indent.component';
import { ListIndentComponent } from './list-indent/list-indent.component';
import { AcknowledgementComponent } from './acknowledgement/acknowledgement.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-modal';
import { InventoryAssignComponent } from './inventory-assign/inventory-assign.component';
import { InventoryAssignlistComponent } from './inventory-assignlist/inventory-assignlist.component';

@NgModule({
  declarations: [
    InventoryDetailsComponent,
    IndentComponent,
    ListIndentComponent,
    AcknowledgementComponent,
    InventoryAssignComponent,
    InventoryAssignlistComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    NgxPaginationModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule, 
  ]
})
export class InventoryModule { }
