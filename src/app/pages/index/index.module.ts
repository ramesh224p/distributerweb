import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { routing } from './index.routing';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
    imports: [
        CommonModule,    
        NgxEchartsModule,
        routing
    ],
    declarations: [
        IndexComponent,
    ]
})
export class IndexModule { }
