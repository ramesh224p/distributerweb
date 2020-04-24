import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { IndentComponent } from './indent/indent.component';
import { ListIndentComponent } from './list-indent/list-indent.component';
import { AcknowledgementComponent } from './acknowledgement/acknowledgement.component';

@NgModule({
  declarations: [InventoryDetailsComponent, IndentComponent, ListIndentComponent, AcknowledgementComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
