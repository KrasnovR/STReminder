import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ApiService } from './api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { MainFormComponent } from './main-form/main-form.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { ModalInfoComponent } from './modal-info/modal-info.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    MainFormComponent,
    CreateFormComponent,
    ModalInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [ ApiService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
