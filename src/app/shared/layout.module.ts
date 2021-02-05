import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { ModalModule } from "ngx-modal";
import { Ng2ImgMaxModule } from 'ng2-img-max';

import { GlobalService } from './services/global.service';

import { NotificationComponent } from './components/notification/notification.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ContentTopComponent } from './layouts/content-top/content-top.component';
import { PagesTopComponent } from './layouts/pages-top/pages-top.component';
import { RightConfigComponent } from './layouts/right-config/right-config.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ModalModule,
        Ng2ImgMaxModule,
        SharedModule
    ],
    providers: [
        GlobalService
    ],
    declarations: [
        MenuComponent,
        SidebarComponent,
        PagesTopComponent,
        ContentTopComponent,
        NotificationComponent,
        RightConfigComponent,
        LoadingComponent
    ],
    exports: [
        SidebarComponent,
        PagesTopComponent,
        ContentTopComponent,
        NotificationComponent,
        RightConfigComponent,
        LoadingComponent
    ]
})
export class LayoutModule { }
