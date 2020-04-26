import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ LoginComponent ],
    imports: [
      HttpClientModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule
    ] 
  })

  export class LoginModule { }