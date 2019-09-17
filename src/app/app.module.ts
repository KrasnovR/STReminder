import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ApiService } from './api.service';
import { LoaderService } from './loader.service';
import { UpdateService } from './update.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { MainFormComponent } from './main-form/main-form.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { ModalInfoComponent } from './modal-info/modal-info.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader.interceptors';
import { UpdateFormComponent } from './update-form/update-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    MainFormComponent,
    CreateFormComponent,
    ModalInfoComponent,
    LoaderComponent,
    UpdateFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [ UpdateService, ApiService, LoaderService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true } ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
