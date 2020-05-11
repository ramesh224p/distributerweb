import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { routing } from './index.routing';
import { NgxEchartsModule } from 'ngx-echarts';
import { TabContentComponent } from '../../shared/components/tabset/tab-content/tab-content.component';
import { TabsetComponent } from '../../shared/components/tabset/tabset.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IndexService } from './index.service';



@NgModule({
    imports: [
        CommonModule,    
        NgxEchartsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        IndexComponent,
        TabContentComponent,
        TabsetComponent,
    ],
    providers: [IndexService]
})
export class IndexModule { }
