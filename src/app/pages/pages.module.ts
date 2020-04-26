import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { LayoutModule } from '../shared/layout.module';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from '../shared/components/card/card.component';
import { FormsModule } from '@angular/forms';

/* components */
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        SharedModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        PagesComponent,
        LoginComponent,
        CardComponent
    ]
})
export class PagesModule { }
