import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndexComponent } from './index.component';
import { routing } from './index.routing';
import { NgxEchartsModule } from 'ngx-echarts';
import { TabContentComponent } from '../../shared/components/tabset/tab-content/tab-content.component';
import { TabsetComponent } from '../../shared/components/tabset/tabset.component';

import { HttpClient } from '@angular/common/http';
import { IndexService } from './index.service';
import { TodolistComponent } from './todolist/todolist.component';

@NgModule({
    imports: [
        CommonModule,    
        NgxEchartsModule,
        FormsModule,
        routing
    ],
    declarations: [
        IndexComponent,
        TabContentComponent,
        TabsetComponent,
        TodolistComponent,
    ],
    providers: [IndexService]
})
export class IndexModule { }
